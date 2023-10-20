"use client";

import {
  Button,
  Center,
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
import Lottie from "react-lottie-player";
import GoogleSignIn from "@/components/reusables/googleSignIn";
import useKeyCommand from "@/hooks/useKeyCommand";
import SigningupAnimation from "../../../public/signing_up.json";

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
    <Stack justifyContent="center" h="100%" spacing={3.5}>
      {loading ? (
        <Center
          h="100vh"
          top={0}
          left={0}
          pos="absolute"
          bg="rgba(0, 0, 0, .8)"
          w="100vw"
          flexDir="column"
          zIndex={10}
        >
          <Lottie
            loop
            animationData={SigningupAnimation}
            play
            style={{ width: 150, height: 150 }}
          />
          <Text fontSize=".9rem" fontWeight="normal" color="palette.light">
            Signing you in...
          </Text>
        </Center>
      ) : null}
      <Input
        variant="primary"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <InputGroup>
        <Input
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
      <Button
        ref={ref}
        bg="#1380FF"
        onClick={handleSubmit}
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
