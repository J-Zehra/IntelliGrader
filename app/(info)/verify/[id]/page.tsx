"use client";

import CustomContainer from "@/components/reusables/customContainer";
import { Button, Center, Stack, Text, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Lottie from "react-lottie-player";
import confirmAnimation from "../../../../public/confirmAnimation.json";

export default function VerifyEmailPage() {
  const { id } = useParams();
  const navigate = useRouter();
  const toast = useToast();

  const handleMutateUser = () => {
    return axios.put("/api/auth/verify", { id });
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
      <Center h="85vh" w="100%">
        <Stack spacing="1rem" align="center">
          <Lottie
            loop
            animationData={confirmAnimation}
            play
            style={{ width: 250, height: 250 }}
          />
          <Text
            textAlign="center"
            lineHeight="1.8rem"
            fontSize=".9rem"
            opacity={0.8}
          >
            Click verify to start using your account.
          </Text>
          <Button
            w="fit-content"
            fontSize=".9rem"
            onClick={verifyEmail}
            loadingText="Verifying..."
            isLoading={mutateUser.isLoading}
          >
            Verify Email
          </Button>
        </Stack>
      </Center>
    </CustomContainer>
  );
}
