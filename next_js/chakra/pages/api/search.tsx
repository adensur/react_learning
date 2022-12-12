// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { request } from "http";
import type { NextApiRequest, NextApiResponse } from "next";

import type { Data } from "../../utils/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("Got request!");
  //
  let client_id = "3df16b4f97464a6dacbb72867417bd5e";
  let client_secret = "ffdb57ad64f9441aafbd4faac7c14045";
  console.log(
    "Auth: ",
    Buffer.from(client_id + ":" + client_secret).toString("base64")
  );

  let token = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64")
    },
    body: "grant_type=client_credentials"
  })
    .then((response) => response.json())
    .then((data) => {
      return data.access_token;
    })
    .catch(function (error) {
      console.log("Got error: ", error);
    });
  console.log("Access token: ", token, typeof token);
  let resp = await fetch(
    "https://api.spotify.com/v1/search?type=track,artist&q=" + req.query.text,
    {
      headers: {
        Authorization: "Bearer " + token
      }
    }
  ).then((response) => response.json());
  //console.log("Got resp: ", resp);
  const tracks_unpacked = resp.tracks.items.map((track: any) => {
    return {
      name: track.name,
      artists: track.artists.map((artist: any) => artist.name).join(", "),
      id: track.id
    };
  });
  for (const track of resp.tracks.items) {
    console.log(
      "Track: ",
      track.name,
      track.artists.map((artist: any) => artist.name).join(", ")
    );
  }
  res.status(200).json({
    content: "You searched for: " + req.query.text,
    tracks: tracks_unpacked
  });
}
