// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { request } from "http";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  content: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("Got request!");
  //
  var client_id = "3df16b4f97464a6dacbb72867417bd5e";
  var client_secret = "ffdb57ad64f9441aafbd4faac7c14045";
  console.log(
    "Auth: ",
    Buffer.from(client_id + ":" + client_secret).toString("base64")
  );

  fetch("https://accounts.spotify.com/api/token", {
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
    .then((data) => console.log(data))
    .catch(function (error) {
      console.log("Got error: ", error);
    });
  res.status(200).json({ content: "You searched for: " + req.query.text });
}
