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
  InputGroup,
  Link
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Import the functions you need from the SDKs you need

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { app } from "./firebase_init";
import PasswordInput from "./password_form";
import { config } from "../utils/config";

type SignUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SignupModal({ isOpen, onClose }: SignUpModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
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
          <Link href={config.feedHref}>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                console.log(
                  "Creating user with email and password: ",
                  email,
                  password
                );
                const auth = getAuth(app);
                createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log("Created user: ", user);
                    router.push(config.feedHref);
                    // ...
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(
                      "Error creating user: ",
                      errorCode,
                      errorMessage
                    );
                  });
                onClose();
              }}
            >
              Create User
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
