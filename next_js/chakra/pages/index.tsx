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

import SignupModal from "../components/signup";
import LoginModal from "../components/login";
import Layout from "../components/layout";

export default function Home() {
  const {
    isOpen: isOpenSignup,
    onOpen: onOpenSignup,
    onClose: onCloseSignup
  } = useDisclosure();
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin
  } = useDisclosure();

  return (
    <>
      <Layout>
        <Button onClick={onOpenSignup}>Sign up</Button>
        <Button onClick={onOpenLogin}>Login</Button>
      </Layout>

      <SignupModal isOpen={isOpenSignup} onClose={onCloseSignup} />
      <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin} />
    </>
  );
}
