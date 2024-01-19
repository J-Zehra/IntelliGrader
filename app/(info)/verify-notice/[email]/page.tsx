"use client";

import CustomContainer from "@/components/reusables/customContainer";
import { Button, Center, Highlight, Stack, Text } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Lottie from "react-lottie-player";
import emailAnimation from "../../../../public/emailAnimation.json";

export default function VerifyNoticePage() {
  const { email } = useParams();
  const decodedEmail = decodeURIComponent(email as string);
  const navigate = useRouter();

  return (
    <CustomContainer>
      <Center h="80vh" w="100%">
        <Stack spacing="1rem" align="center">
          <Lottie
            loop
            animationData={emailAnimation}
            play
            style={{ width: 200, height: 200 }}
          />
          <Text textAlign="center" lineHeight="1.8rem">
            <Highlight
              query={decodedEmail}
              styles={{
                bg: "rgba(0, 0, 0, .1)",
                p: ".2rem .5rem",
                borderRadius: ".5rem",
                fontWeight: "medium",
              }}
            >
              {` An email verification has been sent to ${decodedEmail}. Verify it to start
              using your account.`}
            </Highlight>
          </Text>
          <Button
            w="fit-content"
            fontSize=".9rem"
            onClick={() => navigate.push("/signin")}
          >
            Back to Login
          </Button>
        </Stack>
      </Center>
    </CustomContainer>
  );
}
