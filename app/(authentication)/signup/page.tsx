"use client";

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { Teacher } from "@/utils/types";
import Loading from "@/components/loading";

export default function SignupPage() {
  const navigate = useRouter();
  const toast = useToast();

  const { isOpen: viewPassword, onToggle: toggleViewPassword } =
    useDisclosure();
  const { isOpen: viewConfirmPassword, onToggle: toggleViewConfirmPassword } =
    useDisclosure();

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const clearState = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
  };

  const createUser = (user: Teacher) => {
    return axios.post("api/auth/signup", user);
  };

  const mutateTeacher = useMutation({
    mutationFn: createUser,
    mutationKey: ["create-user"],
    onSuccess: () => {
      clearState();
      navigate.push("/signin");
    },
    onError: (error: AxiosError) => {
      const { data } = error.response!;
      const response = data as { error: string; message: string };

      toast({
        title: response.error,
        description: response.message,
        duration: 3000,
        position: "top",
        status: "error",
      });
    },
  });

  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Incomplete Fields.",
        description: "Please fill all the fields.",
        duration: 3000,
        position: "top",
        status: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        description: "Password do not match.",
        duration: 3000,
        position: "top",
        status: "error",
      });
      return;
    }

    const newUser: Teacher = {
      username,
      email,
      password,
    };

    mutateTeacher.mutate(newUser);
  };

  return (
    <Stack justifyContent="center" w="100%" spacing={3.5}>
      {mutateTeacher.isLoading ? <Loading message="Signing you up" /> : null}
      <Input
        borderRadius=".75rem"
        variant="primary"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Name"
      />
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
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={viewPassword ? "text" : "password"}
          placeholder="Password"
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
            <AiFillEye fontSize="1.2rem" />
          ) : (
            <AiFillEyeInvisible fontSize="1.2rem" />
          )}
        </InputRightElement>
      </InputGroup>
      <InputGroup>
        <Input
          borderRadius=".75rem"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          variant="primary"
          type={viewConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
        />
        <InputRightElement
          h="100%"
          color="palette.text"
          opacity=".5"
          w="3.5rem"
          paddingInline=".6rem"
          onClick={toggleViewConfirmPassword}
          cursor="pointer"
        >
          {viewConfirmPassword ? (
            <AiFillEye fontSize="1.2rem" />
          ) : (
            <AiFillEyeInvisible fontSize="1.2rem" />
          )}
        </InputRightElement>
      </InputGroup>
      <Box paddingTop=".6rem" w="100%">
        <Button
          bg="#1380FF"
          w="100%"
          color="palette.background"
          onClick={handleSubmit}
        >
          Sign up
        </Button>
      </Box>
      <Text textAlign="center" color="palette.light" fontSize=".9rem">
        Already have an account?{" "}
        <Link href="signin" style={{ color: "#75AFFF", fontWeight: "bold" }}>
          Sign in
        </Link>
      </Text>
    </Stack>
  );
}
