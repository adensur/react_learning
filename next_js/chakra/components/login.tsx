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
  InputGroup
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { app } from "./firebase_init";
import PasswordInput from "./password_form";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Hello!</ModalBody>

        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            onInput={(event) => {
              setEmail(event.currentTarget.value);
            }}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <PasswordInput password={password} setPassword={setPassword} />

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              console.log(
                "Logging in with email and password: ",
                email,
                password
              );
              const auth = getAuth(app);
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  console.log("Logged in with user: ", user);
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(
                    "Error loggin in user: ",
                    errorCode,
                    errorMessage
                  );
                });
              onClose();
            }}
          >
            Log In
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
