"use client";

import { Box, Center, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Stack w="100%" h="100vh">
      <Center flex={1}>
        <Image
          alt="logo"
          width={500}
          height={500}
          src="/logo_v2.svg"
          style={{ width: "12rem" }}
        />
      </Center>
      <Box
        flex={1.6}
        bg="palette.accent"
        w="100%"
        h="100%"
        borderTopRadius="2rem"
        p="1.5rem"
      >
        {children}
      </Box>
    </Stack>
  );
}
