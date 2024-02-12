"use client";

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next13-progressbar";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { validate } from "../utils/validator";

export default function ResetPasswordPage() {
  const { id } = useParams();
  const navigate = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasCapitalLetter, setHasCapitalLetter] = useState(false);
  const [hasLengthOf8, setHasLengthOf8] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const { isOpen: viewPassword, onToggle: toggleViewPassword } =
    useDisclosure();
  const { isOpen: viewConfirmPassword, onToggle: toggleViewConfirmPassword } =
    useDisclosure();
  const toast = useToast();

  const clearState = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const { data: userData, isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      const res = await axios.get("/api/get-user", { params: { userId: id } });

      return res.data;
    },
  });

  const mutateUser = useMutation({
    mutationKey: ["update-password"],
    mutationFn: () => {
      return axios.put("/api/update-password", { password, id });
    },
    onSuccess: () => {
      clearState();
      toast({
        title: "Success!",
        description: "Password successfully changed.",
        duration: 3000,
        position: "top",
        status: "success",
      });
      navigate.push("/signin");
    },
    onError: ({ response }) => {
      console.log(response.data);
      const { data } = response;
      toast({
        title: data.error,
        description: data.message,
        duration: 3000,
        position: "top",
        status: "error",
      });
      clearState();
    },
  });

  const handleChangePassword = () => {
    const { isValid, errorDescription, errorTitle } = validate(
      password,
      confirmPassword,
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

    mutateUser.mutate();
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
    <Stack
      h="100vh"
      justify="center"
      align="center"
      spacing="2.5rem"
      paddingInline="2rem"
    >
      <Skeleton isLoaded={!isLoading} borderRadius=".8rem">
        <Text
          fontSize="1.5rem"
          opacity={0.8}
          fontWeight="bold"
          color="palette.button.primary"
        >
          Password Reset for {userData?.username}
        </Text>
      </Skeleton>
      <Stack maxW="20rem" w="100%" spacing="1.2rem">
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
            <Box color="palette.text">
              {hasLengthOf8 ? <FaCheck /> : <IoMdClose />}
            </Box>
            <Text fontSize=".8rem" color="palette.text">
              has atleast 8 characters
            </Text>
          </Stack>
          <Stack
            direction="row"
            align="center"
            transition="all .3s ease"
            opacity={hasSpecialCharacter ? 1 : 0.5}
          >
            <Box color="palette.text">
              {hasSpecialCharacter ? <FaCheck /> : <IoMdClose />}
            </Box>
            <Text fontSize=".8rem" color="palette.text">
              has a special character
            </Text>
          </Stack>
          <Stack
            direction="row"
            align="center"
            transition="all .3s ease"
            opacity={hasNumber ? 1 : 0.5}
          >
            <Box color="palette.text">
              {hasNumber ? <FaCheck /> : <IoMdClose />}
            </Box>
            <Text fontSize=".8rem" color="palette.text">
              has a number
            </Text>
          </Stack>
          <Stack
            direction="row"
            align="center"
            transition="all .3s ease"
            opacity={hasCapitalLetter ? 1 : 0.5}
          >
            <Box color="palette.text">
              {hasCapitalLetter ? <FaCheck /> : <IoMdClose />}
            </Box>
            <Text fontSize=".8rem" color="palette.text">
              has a capital letter
            </Text>
          </Stack>
          <Stack
            direction="row"
            align="center"
            transition="all .3s ease"
            opacity={passwordMatch ? 1 : 0.5}
          >
            <Box color="palette.text">
              {passwordMatch ? <FaCheck /> : <IoMdClose />}
            </Box>
            <Text fontSize=".8rem" color="palette.text">
              password matched
            </Text>
          </Stack>
        </Stack>
        <Button
          onClick={handleChangePassword}
          isLoading={mutateUser.isLoading}
          loadingText="Resetting..."
          colorScheme="blue"
        >
          Reset Password
        </Button>
      </Stack>
    </Stack>
  );
}
