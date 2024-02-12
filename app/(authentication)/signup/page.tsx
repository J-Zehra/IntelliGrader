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
import { useRouter } from "next13-progressbar";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { Teacher } from "@/utils/types";
import Loading from "@/components/loading";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { validate } from "./utils/validator";

export default function SignupPage() {
  const navigate = useRouter();
  const toast = useToast();
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasCapitalLetter, setHasCapitalLetter] = useState(false);
  const [hasLengthOf8, setHasLengthOf8] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

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
      const encodedData = encodeURIComponent(email);
      clearState();
      navigate.push(`/verify-notice/${encodedData}`);
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
    const { isValid, errorDescription, errorTitle } = validate(
      email,
      password,
      confirmPassword,
      username,
    );

    if (!isValid) {
      toast({
        title: errorTitle,
        description: errorDescription,
        duration: 5000,
        position: "top",
        status: "error",
        isClosable: true,
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

  useEffect(() => {
    const capitalLetter = /[A-Z]/.test(password);
    const specialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);
    const number = /\d/.test(password);

    if (capitalLetter) {
      setHasCapitalLetter(true);
    } else {
      setHasCapitalLetter(false);
    }

    if (specialCharacter) {
      setHasSpecialCharacter(true);
    } else {
      setHasSpecialCharacter(false);
    }

    if (number) {
      setHasNumber(true);
    } else {
      setHasNumber(false);
    }

    if (password.length >= 8 || confirmPassword.length >= 8) {
      setHasLengthOf8(true);
    } else {
      setHasLengthOf8(false);
    }

    if (password || confirmPassword) {
      if (password === confirmPassword) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    }
  }, [password, confirmPassword]);

  return (
    <Stack justifyContent="center" w="100%" spacing={3.5}>
      {mutateTeacher.isLoading ? <Loading message="Signing you up" /> : null}
      <Input
        borderRadius=".75rem"
        variant="primary"
        type="text"
        value={username}
        maxLength={30}
        minLength={6}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Username"
      />
      <Input
        borderRadius=".75rem"
        variant="primary"
        value={email}
        type="email"
        maxLength={50}
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
          maxLength={30}
          minLength={8}
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
          maxLength={30}
          minLength={8}
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
      <Stack paddingLeft=".5rem" spacing={0.4}>
        <Stack
          direction="row"
          align="center"
          transition="all .3s ease"
          opacity={hasLengthOf8 ? 1 : 0.5}
        >
          <Box color="palette.light">
            {hasLengthOf8 ? <FaCheck /> : <IoMdClose />}
          </Box>
          <Text fontSize=".8rem" color="palette.light">
            has atleast 8 characters
          </Text>
        </Stack>
        <Stack
          direction="row"
          align="center"
          transition="all .3s ease"
          opacity={hasSpecialCharacter ? 1 : 0.5}
        >
          <Box color="palette.light">
            {hasSpecialCharacter ? <FaCheck /> : <IoMdClose />}
          </Box>
          <Text fontSize=".8rem" color="palette.light">
            has a special character
          </Text>
        </Stack>
        <Stack
          direction="row"
          align="center"
          transition="all .3s ease"
          opacity={hasNumber ? 1 : 0.5}
        >
          <Box color="palette.light">
            {hasNumber ? <FaCheck /> : <IoMdClose />}
          </Box>
          <Text fontSize=".8rem" color="palette.light">
            has a number
          </Text>
        </Stack>
        <Stack
          direction="row"
          align="center"
          transition="all .3s ease"
          opacity={hasCapitalLetter ? 1 : 0.5}
        >
          <Box color="palette.light">
            {hasCapitalLetter ? <FaCheck /> : <IoMdClose />}
          </Box>
          <Text fontSize=".8rem" color="palette.light">
            has a capital letter
          </Text>
        </Stack>
        <Stack
          direction="row"
          align="center"
          transition="all .3s ease"
          opacity={passwordMatch ? 1 : 0.5}
        >
          <Box color="palette.light">
            {passwordMatch ? <FaCheck /> : <IoMdClose />}
          </Box>
          <Text fontSize=".8rem" color="palette.light">
            password matched
          </Text>
        </Stack>
      </Stack>
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
