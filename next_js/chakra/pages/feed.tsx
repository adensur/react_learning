import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Grid,
  Heading,
  HStack,
  Box,
  Text,
  GridItem
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, push, update, set } from "firebase/database";

import { app } from "../components/firebase_init";
import { config } from "../utils/config";
import Layout from "../components/layout";
import AddSongModal from "../components/add_song";
import AddSongModal2 from "../components/add_song2";
import type { Data, Track, ExtendedTrack } from "../utils/data";

export default function Feed() {
  const auth = getAuth(app);
  let [uid, setUid] = useState<string | null>(null);
  const router = useRouter();
  const db = getDatabase(app);
  useEffect(() => {
    if (!uid) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          console.log("Got user id: ", user.uid);
          setUid(user.uid);
          // ...
        } else {
          console.log("Got no user id");
          // User is signed out
          // ...
          router.push(config.homeHref);
        }
      });
    }
  });
  console.log("Got user id2: ", uid);
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
    if (!selectedTrack) {
      return (
        <>
          <Layout>
            <Text>Welcome, {uid}</Text>
            <Button onClick={onOpenAddSong}>Add Song</Button>
          </Layout>
          <AddSongModal
            isOpen={isOpenAddSong}
            onClose={onCloseAddSong}
            submitCallback={(track: Track) => {
              console.log("Selected track: ", track);
              setSelectedTrack(track);
            }}
          />
        </>
      );
    } else {
      return (
        <>
          <Layout>
            <Text>Welcome, {uid}</Text>
            <Button onClick={onOpenAddSong}>Add Song</Button>
          </Layout>
          <AddSongModal2
            isOpen={isOpenAddSong}
            onClose={onCloseAddSong}
            selectedTrack={selectedTrack}
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
        </>
      );
    }
  } else {
    return (
      <>
        <Layout>
          <Text>Loading</Text>
        </Layout>
      </>
    );
  }
}
