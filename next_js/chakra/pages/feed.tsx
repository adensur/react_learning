import { Button, useDisclosure, Text, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import * as _ from "lodash";
import { getDatabase, ref, child, push, set, onValue } from "firebase/database";

import { app } from "../components/firebase_init";
import Layout from "../components/layout";
import AddSongModal from "../components/add_song";
import AddSongModal2 from "../components/add_song2";
import type { Track, ExtendedTrack } from "../utils/data";
import useAuth from "../utils/auth";
import FeedTrack from "../components/feed_song";

function Tracks({ tracks }: { tracks: Array<ExtendedTrack> }) {
  return (
    <Flex flexDirection="column">
      <>
        {tracks.map((track: ExtendedTrack, idx: number) => {
          return <FeedTrack flex="1" key={idx} track={track} />;
        })}
      </>
    </Flex>
  );
}

export default function Feed() {
  const uid = useAuth();
  //let [userSnapshot, setUserSnapshot] = useState<any | null>(null);
  let [tracks, setTracks] = useState<Array<ExtendedTrack>>([]);
  const db = getDatabase(app);
  useEffect(() => {
    // set up firebase db listener
    const query = ref(db, "users/" + uid);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        console.log("Data: ", data);
        //console.log("User Snapshot: ", userSnapshot);
        let tracks2 = [];
        for (const trackId in data.tracks) {
          tracks2.push(data.tracks[trackId]);
        }
        console.log("Tracks 2: ", tracks2);
        if (!_.isEqual(tracks, tracks2)) {
          console.log("Data != user snapshot!");
          //setUserSnapshot(data);
          setTracks(tracks2);
        }
      }
    });
  });
  //console.log("Got user snapshot: ", userSnapshot);
  const {
    isOpen: isOpenAddSong,
    onOpen: onOpenAddSong,
    onClose: onCloseAddSong
  } = useDisclosure();
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const {
    isOpen: isOpenAddSong2,
    onOpen: onOpenAddSong2,
    onClose: onCloseAddSong2
  } = useDisclosure();
  console.log("Tracks: ", tracks);
  if (uid && tracks.length > 0) {
    return (
      <>
        <Layout>
          <Text>Welcome, {uid}</Text>
          <Tracks tracks={tracks} />
          <Button onClick={onOpenAddSong}>Add Song</Button>
        </Layout>
        <AddSongModal
          isOpen={isOpenAddSong}
          onClose={onCloseAddSong}
          submitCallback={(track: Track) => {
            console.log("Selected track: ", track);
            setSelectedTrack(track);
            onOpenAddSong2();
          }}
        />
        {selectedTrack && (
          <AddSongModal2
            isOpen={isOpenAddSong2}
            onClose={onCloseAddSong2}
            selectedTrack={selectedTrack!!}
            submitCallback={(track: ExtendedTrack) => {
              console.log("Selected track: ", track);
              const newPostKey = push(child(ref(db), "posts")).key;
              set(
                ref(db, "users/" + uid + "/tracks/" + newPostKey),
                track
              ).then(() => {
                // only close the dialogue in case the data is commited
                onCloseAddSong();
                setSelectedTrack(null); // clear selected track in case we click "add song" again
              });
            }}
          />
        )}
        ;
      </>
    );
  }
}
