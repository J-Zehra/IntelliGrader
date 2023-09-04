"use client";

import { Box, Center, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import CustomContainer from "./reusables/customContainer";
import Profile from "./profile";

export default function Header() {
  const path = usePathname();
  const navigate = useRouter();

  if (path === "/signin" || path === "/signup") return null;

  return (
    <Box pos="fixed" w="100%" zIndex={100}>
      <CustomContainer>
        <Stack direction="row" h="5rem" align="center" justify="space-between">
          <Center onClick={() => navigate.push("/")}>
            <Image
              src="/logo_v1.svg"
              alt="logo"
              width={500}
              height={500}
              style={{ width: "10rem" }}
            />
          </Center>
          <Profile />
        </Stack>
      </CustomContainer>
    </Box>
  );
}
