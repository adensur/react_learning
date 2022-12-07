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

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Text>Some heading</Text>
        </GridItem>
        <GridItem area="main">
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Button onClick={onOpen}>Open Modal</Button>
            <Button onClick={onOpen}>Open Modal</Button>
            <Button onClick={onOpen}>Open Modal</Button>
          </Flex>
        </GridItem>
      </Grid>

      <SignupModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
