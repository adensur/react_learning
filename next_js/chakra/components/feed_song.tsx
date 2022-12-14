import { Box, Flex, Text, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";
import { ExtendedTrack } from "../utils/data";
import { Icon, createIcon } from "@chakra-ui/react";

const BookmarkIcon = (props: any) => (
  <Icon width="14" height="21" viewBox="0 0 14 21" fill="none" {...props}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 20.618L7 17.118L14 20.618V2C14 0.89543 13.1046 0 12 0H2C0.89543 0 0 0.89543 0 2V20.618ZM7 14.882L2 17.382V2H12V17.382L7 14.882Z"
      fill="black"
    />
  </Icon>
);

const LearningIcon = (props: any) => (
  <Icon width="25" height="10" viewBox="0 0 25 10" fill="none" {...props}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.5 5C0.947715 5 0.5 4.55228 0.5 4C0.5 3.44772 0.947715 3 1.5 3H1.91604C2.6876 1.2341 4.44968 0 6.5 0C8.3244 0 9.92059 0.977119 10.7938 2.43658C11.2845 2.15804 11.8765 2 12.5 2C13.1235 2 13.7155 2.15804 14.2062 2.43658C15.0794 0.977119 16.6756 0 18.5 0C20.5503 0 22.3124 1.2341 23.084 3H23.5C24.0523 3 24.5 3.44772 24.5 4C24.5 4.55228 24.0523 5 23.5 5C23.5 7.76142 21.2614 10 18.5 10C15.7386 10 13.5 7.76142 13.5 5C13.5 4.83125 13.5084 4.66445 13.5247 4.5H13.5C13.5 4.29657 13.1046 4 12.5 4C11.8954 4 11.5 4.29657 11.5 4.5H11.4753C11.4916 4.66445 11.5 4.83125 11.5 5C11.5 7.76142 9.26142 10 6.5 10C3.73858 10 1.5 7.76142 1.5 5ZM6.5 8C8.15685 8 9.5 6.65685 9.5 5C9.5 3.34315 8.15685 2 6.5 2C4.84315 2 3.5 3.34315 3.5 5C3.5 6.65685 4.84315 8 6.5 8ZM21.5 5C21.5 6.65685 20.1569 8 18.5 8C16.8431 8 15.5 6.65685 15.5 5C15.5 3.34315 16.8431 2 18.5 2C20.1569 2 21.5 3.34315 21.5 5Z"
      fill="black"
    />
  </Icon>
);

const CompletedIcon = (props: any) => (
  <Icon width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20ZM14.293 7.29289L9.00008 12.5858L6.70718 10.2929L5.29297 11.7071L9.00008 15.4142L15.7072 8.70711L14.293 7.29289Z"
      fill="black"
    />
  </Icon>
);

//export default function FeedTrack({ track }: { track: ExtendedTrack }) {
export default function FeedTrack(props: any) {
  const { track } = props;
  let icon = <LearningIcon />;
  if (track.state == "bookmark") {
    icon = <BookmarkIcon />;
  } else if (track.state == "completed") {
    icon = <CompletedIcon />;
  }
  return (
    <Flex>
      <Box w="100%" px={2} borderWidth="1px">
        <Grid
          gridTemplateColumns="1fr auto"
          columnGap="20px"
          templateAreas={`"artist icon"
          "song icon"`}
        >
          <GridItem area="artist">
            <Text fontSize="sm">{track.track.artists}</Text>
          </GridItem>
          <GridItem area="song">
            <Text as="b">{track.track.name}</Text>
          </GridItem>
          <GridItem area="icon">{icon}</GridItem>
        </Grid>
      </Box>
    </Flex>
  );
}
