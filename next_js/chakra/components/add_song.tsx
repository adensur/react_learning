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
  GridItem,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputRightElement,
  Input,
  FormHelperText,
  Link,
  InputGroup
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Import the functions you need from the SDKs you need

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { app } from "./firebase_init";
import PasswordInput from "./password_form";
import { config } from "../utils/config";
import type { Data, Track } from "../utils/data";

type AddSongModalProps = {
  isOpen: boolean;
  onClose: () => void;
  submitCallback: (track: Track) => void;
};

function TrackList({
  tracks,
  submitCallback
}: {
  tracks: Track[];
  submitCallback: (track: Track) => void;
}) {
  return (
    <>
      {tracks.map((track, idx) => (
        <Button
          variant="ghost"
          onClick={() => {
            submitCallback(track);
          }}
          key={idx}
        >
          {track.name}
        </Button>
      ))}
    </>
  );
}

export default function AddSongModal({
  isOpen,
  onClose,
  submitCallback
}: AddSongModalProps) {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<Data | null>(null);
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Song</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Type song or artist name</ModalBody>

        <FormControl>
          <FormLabel>Search for ...</FormLabel>
          <Input
            type="email"
            onInput={(event) => {
              setSearchText(event.currentTarget.value);
            }}
          />
        </FormControl>
        {data == null ? (
          <></>
        ) : (
          <>
            <TrackList tracks={data.tracks} submitCallback={submitCallback} />
          </>
        )}

        <ModalFooter>
          <Link href={config.feedHref}>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                e.preventDefault();
                console.log("Search button clicked with text: ", searchText);
                fetch("/api/search?text=" + searchText)
                  .then((res) => res.json())
                  .then((data) => {
                    console.log("Got answer: ", data);
                    setData(data);
                  });
                // onClose();
              }}
            >
              Search
            </Button>
          </Link>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
