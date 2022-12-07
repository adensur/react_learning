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
      <Grid
        height="100vh"
        width="100vw"
        gridTemplateRows="auto 1fr"
        templateAreas={`"header"
          "main"`}
        overflow="auto"
      >
        <GridItem area="header">
          <Text>Badger Clone</Text>
        </GridItem>
        <GridItem area="main">
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Button onClick={onOpenSignup}>Sign up</Button>
            <Button onClick={onOpenLogin}>Login</Button>
          </Flex>
        </GridItem>
      </Grid>

      <SignupModal isOpen={isOpenSignup} onClose={onCloseSignup} />
      <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin} />
    </>
  );
}
