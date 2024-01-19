"use client";

import CustomContainer from "@/components/reusables/customContainer";
import { Button, Center, Stack, Text, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function VerifyEmailPage() {
  const { id } = useParams();
  const navigate = useRouter();
  const toast = useToast();

  const handleMutateUser = () => {
    return axios.put("/auth/verify", { id });
  };

  const mutateUser = useMutation({
    mutationFn: handleMutateUser,
    mutationKey: ["update-user", id],
    onSuccess: () => {
      toast({
        title: "Verified",
        status: "success",
        duration: 3000,
      });
      navigate.push("/signin");
    },
  });

  const verifyEmail = () => {
    mutateUser.mutate();
  };

  return (
    <CustomContainer>
      <Center h="100vh" w="100%">
        <Stack spacing="1rem" align="center">
          <Text textAlign="center" lineHeight="1.8rem">
            Click verify to start using your account.
          </Text>
          <Button
            w="fit-content"
            fontSize=".9rem"
            onClick={verifyEmail}
            isLoading={mutateUser.isLoading}
          >
            Verify Email
          </Button>
        </Stack>
      </Center>
    </CustomContainer>
  );
}
