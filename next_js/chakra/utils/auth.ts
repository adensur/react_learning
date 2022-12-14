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

import * as _ from "lodash";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getDatabase,
  ref,
  child,
  push,
  update,
  set,
  onValue
} from "firebase/database";

import { app } from "../components/firebase_init";
import { config } from "../utils/config";
import Layout from "../components/layout";
import AddSongModal from "../components/add_song";
import AddSongModal2 from "../components/add_song2";
import type { Data, Track, ExtendedTrack } from "../utils/data";

export default function useAuth() {
  const router = useRouter();
  const auth = getAuth(app);
  let [uid, setUid] = useState<string | null>(null);
  useEffect(() => {
    console.log("Use effect called!");
    // handle auth
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
  return uid;
}
