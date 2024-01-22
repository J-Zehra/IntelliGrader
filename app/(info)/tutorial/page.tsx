"use client";

import { Center, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function TutorialPage() {
  const navigate = useRouter();
  const tutorials = [
    { title: "Quick Tutorial", link: "quick-tutorial" },
    { title: "Navigation Guide", link: "navigation-tutorial" },
    { title: "Scanning Guide", link: "scanning-guide" },
    { title: "Shading Guide", link: "shading-guide" },
    // { title: "Error Guide", link: "error-guide" },
  ];

  return (
    <Stack>
      <Text fontSize="1.2rem" fontWeight="bold" opacity={0.6}>
        TUTORIALS
      </Text>
      <Wrap pt="1.2rem" spacing=".6rem">
        {tutorials.map((tutorial) => {
          return (
            <WrapItem
              cursor="pointer"
              _hover={{ bg: "#D0DCEB" }}
              borderRadius="1rem"
              transition="all .3s ease"
              bg="palette.light"
              onClick={() => navigate.push(`/tutorial/${tutorial.link}`)}
            >
              <Center p="1.5rem">
                <Text fontWeight="medium" opacity={0.8}>
                  {tutorial.title}
                </Text>
              </Center>
            </WrapItem>
          );
        })}
      </Wrap>
    </Stack>
  );
}