import { Center, Text } from "@chakra-ui/react";
import React from "react";
import Lottie from "react-lottie-player";
import loadingAnimation from "../public/signing_up.json";

export default function Loading({ message }: { message: string }) {
  return (
    <Center
      h="100vh"
      top={0}
      left={0}
      pos="absolute"
      bg="rgba(0, 0, 0, .8)"
      w="100vw"
      flexDir="column"
      zIndex="overlay"
    >
      <Lottie
        loop
        animationData={loadingAnimation}
        play
        style={{ width: 150, height: 150 }}
      />
      <Text fontSize=".9rem" fontWeight="normal" color="palette.light">
        {message}...
      </Text>
    </Center>
  );
}
