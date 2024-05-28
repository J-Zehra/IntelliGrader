"use client";

import { Box, Center, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next13-progressbar";
import { motion } from "framer-motion";
import CustomContainer from "./reusables/customContainer";
import Profile from "./profile";

export default function Header() {
  const path = usePathname();
  const navigate = useRouter();

  if (
    path === "/signin" ||
    path === "/signup" ||
    path === "/pdf" ||
    path.includes("verify") ||
    path.includes("offline") ||
    path.includes("forgot-password") ||
    path.includes("reset-notice") ||
    path.includes("reset-password")
  )
    return null;

  return (
    <Box
      pos="fixed"
      w="100%"
      zIndex={100}
      bg="palette.background"
      boxShadow="0 5px 10px rgba(0, 0, 0, .02)"
      as={motion.div}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
    >
      <CustomContainer>
        <Stack direction="row" h="4rem" align="center" justify="space-between">
          <Center
            gap=".5rem"
            cursor="pointer"
            onClick={() => navigate.push("/")}
          >
            <Image
              src="/logo_v1.svg"
              alt="logo"
              width={500}
              height={500}
              style={{ width: "10rem" }}
            />
            {/* <Text fontWeight="bold" color="red.800">
              PUP-Grader
            </Text> */}
          </Center>
          <Profile />
        </Stack>
      </CustomContainer>
    </Box>
  );
}
