"use client";

import { Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next13-progressbar";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post("/api/auth/forgot-password", { email })
      .then(() => {
        setLoading(false);
        const encodedData = encodeURIComponent(email);
        navigate.push(`/reset-notice/${encodedData}`);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err.response.data.error,
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          position: "top",
        });
        setLoading(false);
      });
  };

  return (
    <Stack placeContent="center" h="80%" w="100%" p={0}>
      <Stack spacing="1rem">
        <Text
          color="palette.background"
          marginBottom="1.2rem"
          fontWeight="medium"
          textAlign="center"
        >
          Please input the email you want to reset.
        </Text>
        <Input
          borderRadius=".75rem"
          variant="primary"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="example@email.com"
        />
        <Button
          w="100%"
          bg="#1380FF"
          onClick={handleSubmit}
          color="palette.background"
          isLoading={loading}
          loadingText="Sending..."
          colorScheme="blue"
        >
          Send Confirmation
        </Button>
      </Stack>
    </Stack>
  );
}
