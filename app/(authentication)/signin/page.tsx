"use client";

import {
  Button,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import GoogleSignIn from "@/components/reusables/googleSignIn";

export default function SinginPage() {
  const navigate = useRouter();
  const { isOpen: viewPassword, onToggle: toggleViewPassword } =
    useDisclosure();
  return (
    <Stack justifyContent="center" h="100%" spacing={6}>
      <Input variant="primary" placeholder="Email" />
      <InputGroup>
        <Input
          variant="primary"
          placeholder="Password"
          type={viewPassword ? "text" : "password"}
        />
        <InputRightElement
          h="100%"
          color="palette.text"
          opacity=".5"
          w="3.5rem"
          cursor="pointer"
          onClick={toggleViewPassword}
        >
          {viewPassword ? (
            <AiFillEye fontSize="1.5rem" />
          ) : (
            <AiFillEyeInvisible fontSize="1.5rem" />
          )}
        </InputRightElement>
      </InputGroup>
      <Button
        bg="#1380FF"
        onClick={() => navigate.push("/")}
        color="palette.background"
      >
        Sign in
      </Button>
      <Text textAlign="center" color="palette.light" fontSize=".9rem">
        Doesn&apos;t have an account yet?
        <Link
          href="signup"
          style={{ color: "#75AFFF", fontWeight: "bold", marginLeft: "1ch" }}
        >
          Sign up
        </Link>
      </Text>
      <Stack opacity=".6" direction="row" alignItems="center">
        <Divider />
        <Text color="palette.light">or</Text>
        <Divider />
      </Stack>
      <Stack w="100%" direction="row" justify="center">
        <GoogleSignIn />
      </Stack>
    </Stack>
  );
}
