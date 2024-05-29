"use client";

import {
  Box,
  Center,
  Stack,
  Text,
  useMediaQuery,
  Image as ChakraImage,
  Image,
} from "@chakra-ui/react";
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
      <Center
        alignItems="start"
        paddingLeft={isDesktopLayout ? "8rem" : ""}
        flex={2}
        flexDir="column"
        gap="1rem"
      >
        <Center w="100%" paddingBottom="2rem">
          <Image
            src="/logo_v2.svg"
            w={isDesktopLayout ? "20rem" : "70%"}
            alt="Logo"
          />
        </Center>
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
            left="25rem"
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
