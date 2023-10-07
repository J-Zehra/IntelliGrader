import { Center, Image } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import React from "react";

export default function GoogleSignIn() {
  const handleGoogleSignin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };
  return (
    <Center
      boxShadow="none"
      bg="palette.light"
      color="palette.light"
      aria-label="google-icon"
      w="fit-content"
      p=".8rem"
      _hover={{ bg: "palette.background" }}
      borderRadius=".5rem"
      onClick={handleGoogleSignin}
    >
      <Image src="/google.svg" w="2rem" alt="google-icon" />
    </Center>
  );
}
