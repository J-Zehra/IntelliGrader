"use client";

import {
  Box,
  Center,
  Stack,
  Text,
  useMediaQuery,
  Image as ChakraImage,
} from "@chakra-ui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AuthLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [isDesktopLayout] = useMediaQuery("(min-width: 40em)");
  const pathName = usePathname();

  return (
    <Stack
      position="relative"
      w="100%"
      h="100vh"
      direction={isDesktopLayout ? "row" : "column"}
    >
      <Center flex={1}>
        <Image
          alt="logo"
          width={500}
          height={500}
          src="/logo_v2.svg"
          style={{
            width: isDesktopLayout ? "15rem" : "12rem",
            marginLeft: isDesktopLayout ? "10rem" : 0,
          }}
        />
      </Center>
      <Center
        flex={isDesktopLayout ? 2 : 1.6}
        bg={isDesktopLayout ? "" : "palette.accent"}
        w="100%"
        h="100%"
        justifyContent="end"
        borderTopRadius={isDesktopLayout ? "0" : "2rem"}
        p="1.5rem"
      >
        {isDesktopLayout ? (
          <ChakraImage
            src="/auth_bg_2.png"
            left="15rem"
            top={0}
            zIndex={-1}
            h="100%"
            w="100%"
            pos="absolute"
          />
        ) : null}
        <Center
          flexDir="column"
          h="100%"
          gap="2.5rem"
          marginRight={isDesktopLayout ? "10rem" : "0"}
          w={isDesktopLayout ? "25rem" : "100%"}
        >
          {isDesktopLayout ? (
            <Box>
              <Text
                color="palette.background"
                fontSize="2rem"
                fontWeight="bold"
              >
                {pathName.includes("signin")
                  ? "LOGIN YOUR ACCOUNT"
                  : "CREATE YOUR ACCOUNT"}
              </Text>
            </Box>
          ) : null}
          {children}
        </Center>
      </Center>
    </Stack>
  );
}
