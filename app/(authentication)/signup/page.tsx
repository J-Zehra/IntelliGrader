"use client";

import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function SignupPage() {
  const { isOpen: viewPassword, onToggle: toggleViewPassword } =
    useDisclosure();
  const { isOpen: viewConfirmPassword, onToggle: toggleViewConfirmPassword } =
    useDisclosure();

  return (
    <Stack justifyContent="center" h="100%" spacing={6}>
      <Input variant="primary" placeholder="Email" />
      <InputGroup>
        <Input
          variant="primary"
          type={viewPassword ? "text" : "password"}
          placeholder="Password"
        />
        <InputRightElement
          h="100%"
          color="palette.text"
          opacity=".5"
          mr={3}
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
      <InputGroup>
        <Input
          variant="primary"
          type={viewConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
        />
        <InputRightElement
          h="100%"
          color="palette.text"
          opacity=".5"
          mr={3}
          onClick={toggleViewConfirmPassword}
          cursor="pointer"
        >
          {viewConfirmPassword ? (
            <AiFillEye fontSize="1.5rem" />
          ) : (
            <AiFillEyeInvisible fontSize="1.5rem" />
          )}
        </InputRightElement>
      </InputGroup>
      <Button bg="#1380FF" color="palette.background">
        Sign up
      </Button>
      <Text textAlign="center" color="palette.light">
        Already have an account?{" "}
        <Link href="signin" style={{ color: "#75AFFF", fontWeight: "bold" }}>
          Sign in
        </Link>
      </Text>
    </Stack>
  );
}
