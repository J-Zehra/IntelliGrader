"use client";

import {
  Box,
  Button,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import GoogleSignIn from "@/components/reusables/googleSignIn";
import useKeyCommand from "@/hooks/useKeyCommand";
import Loading from "@/components/loading";

export default function SinginPage() {
  const navigate = useRouter();
  const toast = useToast();
  const { ref } = useKeyCommand();
  const { isOpen: viewPassword, onToggle: toggleViewPassword } =
    useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const clearState = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      toast({
        title: "Incomplete Fields.",
        description: "Please fill all the fields.",
        duration: 3000,
        position: "top",
        status: "error",
      });
      return;
    }

    setLoading(true);

    // SEND REQUEST
    await signIn("credentials", { email, password, redirect: false }).then(
      (res) => {
        console.log(res);
        clearState();
        setLoading(false);
        if (res && res.error) {
          toast({
            title: "Error.",
            description: res.error,
            duration: 3000,
            position: "top",
            status: "error",
          });
          return;
        }
        navigate.push("/");
      },
    );
  };

  return (
    <Stack justifyContent="center" w="100%" spacing={3.5}>
      {loading ? <Loading message="Signing you in" /> : null}
      <Input
        borderRadius=".75rem"
        variant="primary"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <InputGroup>
        <Input
          borderRadius=".75rem"
          variant="primary"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
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
      <Box w="100%">
        <Button
          ref={ref}
          w="100%"
          paddingTop=".6rem"
          bg="#1380FF"
          onClick={handleSubmit}
          color="palette.background"
        >
          Sign in
        </Button>
      </Box>
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
