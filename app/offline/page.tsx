"use client";

import { Center, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function OfflinePage() {
  return (
    <Center h="100vh" w="100%">
      <Stack align="center" spacing="2rem">
        <Image src="/logo_v2.svg" w="10rem" alt="Logo" />
        <Text
          fontWeight="semibold"
          color="palette.button.primary"
          opacity={0.7}
        >
          You are offline.
        </Text>
      </Stack>
    </Center>
  );
}
