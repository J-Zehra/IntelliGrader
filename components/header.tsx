"use client";

import { Avatar, Box, Center, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CustomContainer from "./reusables/customContainer";

export default function Header() {
  const path = usePathname();

  if (path === "/signin" || path === "/signup") return null;

  return (
    <Box pos="fixed" w="100%">
      <CustomContainer>
        <Stack direction="row" h="5rem" align="center" justify="space-between">
          <Center>
            <Image
              src="/logo_v1.svg"
              alt="logo"
              width={500}
              height={500}
              style={{ width: "10rem" }}
            />
          </Center>
          <Avatar w="3rem" h="3rem" />
        </Stack>
      </CustomContainer>
    </Box>
  );
}
