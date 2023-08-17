import { Center, Image } from "@chakra-ui/react";
import React from "react";

export default function GoogleSignIn() {
  return (
    <Center
      boxShadow="none"
      bg="palette.light"
      color="palette.light"
      aria-label="google-icon"
      w="fit-content"
      p=".8rem"
      borderRadius=".5rem"
    >
      <Image src="/google.svg" w="2.5rem" alt="google-icon" />
    </Center>
  );
}
