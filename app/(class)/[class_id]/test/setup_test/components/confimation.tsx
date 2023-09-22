import { Center, Divider, Stack, Text } from "@chakra-ui/react";
import Lottie from "react-lottie-player";
import DoneAnimation from "../../../../../../public/done_animation.json";

export default function Confimation() {
  return (
    <Stack paddingBottom="2rem">
      <Center>
        <Lottie
          loop
          animationData={DoneAnimation}
          play
          style={{ width: 200, height: 200 }}
        />
      </Center>
      <Text
        textAlign="center"
        fontSize="1.2rem"
        fontWeight="semibold"
        color="palette.button.primary"
      >
        You are all set!
      </Text>
      <Divider marginTop="2rem" />
    </Stack>
  );
}
