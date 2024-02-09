/* eslint-disable react/require-default-props */
import { Center, Text } from "@chakra-ui/react";
import React from "react";
import Lottie from "react-lottie-player";
import loadingAnimation from "../public/signing_up.json";

export default function Loading({
  message,
  remove = false,
}: {
  message: string;
  remove?: boolean;
}) {
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
      {!remove ? (
        <Lottie
          loop
          animationData={loadingAnimation}
          play
          style={{ width: 150, height: 150 }}
        />
      ) : null}
      <Text fontSize=".9rem" fontWeight="normal" color="palette.light">
        {message}...
      </Text>
    </Center>
  );
}
