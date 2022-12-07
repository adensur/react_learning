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
import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

type SignUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type PasswordProps = {
  password: string;
  setPassword: (password: string) => void;
};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVIXK-9y4OuAm2FtYIj3bbeHhdYUe8p2I",
  authDomain: "badger-clone.firebaseapp.com",
  projectId: "badger-clone",
  storageBucket: "badger-clone.appspot.com",
  messagingSenderId: "357285243423",
  appId: "1:357285243423:web:fef24c53cb9d3674fa032a",
  measurementId: "G-MRWPF9SK02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function PasswordInput({ password, setPassword }: PasswordProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        onInput={(event) => setPassword(event.currentTarget.value)}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default function SignupModal({ isOpen, onClose }: SignUpModalProps) {
  let analytics: Analytics;
  useEffect(() => {
    // side effect, aka is supposed to run only once!
    const analytics = getAnalytics(app);
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
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
                "Creating user with email and password: ",
                email,
                password
              );
              const auth = getAuth();
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log("Error creating user: ", errorCode, errorMessage);
                });
              onClose();
            }}
          >
            Create User
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
