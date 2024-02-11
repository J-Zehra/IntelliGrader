"use client";

import {
  Button,
  Input,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next13-progressbar";
import { useState } from "react";

export default function ResetPasswordPage() {
  const { id } = useParams();
  const navigate = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (!password || !confirmPassword) {
      toast({
        title: "Empty Fields.",
        description: "Please complete all fields.",
        duration: 3000,
        position: "top",
        status: "error",
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Invalid Password.",
        description: "Password must be at least 6 characters long.",
        duration: 3000,
        position: "top",
        status: "error",
      });
      return;
    }
    if (password.length > 25) {
      toast({
        title: "Invalid Password.",
        description: "Password too long. It must not exceed 25 characters",
        duration: 3000,
        position: "top",
        status: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Not Match.",
        description: "Password and confirm password do not match.",
        duration: 3000,
        position: "top",
        status: "error",
      });
      return;
    }

    mutateUser.mutate();
  };

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
        <Input
          placeholder="New password"
          borderRadius=".7rem"
          value={password}
          variant="primary"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          borderRadius=".7rem"
          variant="primary"
          value={confirmPassword}
          placeholder="Confirm new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
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
