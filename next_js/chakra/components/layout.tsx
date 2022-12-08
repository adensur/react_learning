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

export default function Layout({
  children
}: {
  children: JSX.Element[] | JSX.Element;
}) {
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
            {children}
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}
