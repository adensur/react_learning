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
  InputGroup,
  Textarea,
  Radio,
  Stack,
  RadioGroup
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Import the functions you need from the SDKs you need

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { app } from "./firebase_init";
import PasswordInput from "./password_form";
import { config } from "../utils/config";
import type { Data, Track, ExtendedTrack } from "../utils/data";

type AddSong2ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedTrack: Track;
  submitCallback: (track: ExtendedTrack) => void;
};

export default function AddSongModal2({
  isOpen,
  onClose,
  submitCallback,
  selectedTrack
}: AddSong2ModalProps) {
  const [note, setNote] = useState("");
  const [songState, setSongState] = useState("");
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adding Song {selectedTrack.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Please add extra fields</ModalBody>

        <Textarea
          onInput={(event) => {
            setNote(event.currentTarget.value);
          }}
          placeholder="Note"
        />

        <RadioGroup onChange={setSongState} value={songState}>
          <Stack direction="row">
            <Radio value="bookmark">bookmark</Radio>
            <Radio value="learning">learning</Radio>
            <Radio value="completed">completed</Radio>
          </Stack>
        </RadioGroup>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={(e) => {
              e.preventDefault();
              submitCallback({
                track: selectedTrack,
                note: note,
                state: songState
              });
              console.log("Submit button clicked with note: ", note);
            }}
          >
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
