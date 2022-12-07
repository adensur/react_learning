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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

import SignupModal from "../components/signup";
import LoginModal from "../components/login";
import { app } from "../components/firebase_init";
import { config } from "../utils/config";
import { useEffect } from "react";
import { useState } from "react";

export default function Feed() {
  const auth = getAuth(app);
  let [uid, setUid] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
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
  });
  console.log("Got user id2: ", uid);
  if (uid) {
    return (
      <>
        <Text>Welcome, {uid}</Text>
      </>
    );
  } else {
    return (
      <>
        <Text>Loading</Text>
      </>
    );
  }
}
