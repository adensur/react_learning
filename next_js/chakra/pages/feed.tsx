import { Button, useDisclosure, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import * as _ from "lodash";
import { getDatabase, ref, child, push, set, onValue } from "firebase/database";

import { app } from "../components/firebase_init";
import Layout from "../components/layout";
import AddSongModal from "../components/add_song";
import AddSongModal2 from "../components/add_song2";
import type { Track, ExtendedTrack } from "../utils/data";
import useAuth from "../utils/auth";

export default function Feed() {
  const uid = useAuth();
  let [userSnapshot, setUserSnapshot] = useState<any | null>(null);
  const db = getDatabase(app);
  useEffect(() => {
    // set up firebase db listener
    const query = ref(db, "users/" + uid);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        console.log("Data: ", data);
        console.log("User Snapshot: ", userSnapshot);
        if (!_.isEqual(data, userSnapshot)) {
          console.log("Data != user snapshot!");
          setUserSnapshot(data);
        }
      }
    });
  });
  console.log("Got user snapshot: ", userSnapshot);
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
  if (uid) {
    return (
      <>
        <Layout>
          <Text>Welcome, {uid}</Text>
          <Button onClick={onOpenAddSong}>Add Song</Button>
        </Layout>
        {
          //userSnapshot &&
          // userSnapshot!!.tracks.map((track: any, idx: number) => (
          //  <Text key={idx}>{track}</Text>
          //))
        }
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
