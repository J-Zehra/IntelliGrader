"use client";

import { Center, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function TutorialPage() {
  const navigate = useRouter();
  const tutorials = [
    { title: "Quick Tutorial", link: "quick-tutorial" },
    { title: "Navigation Tutorial", link: "navigation-tutorial" },
    { title: "Scanning Guide", link: "scanning-guide" },
    { title: "Shading Guide", link: "shading-guide" },
    // { title: "Error Guide", link: "error-guide" },
  ];

  return (
    <Stack>
      <Text fontSize="1.2rem" fontWeight="bold" opacity={0.6}>
        TUTORIALS
      </Text>
      <Wrap pt="2rem" spacing=".6rem">
        {tutorials.map((tutorial) => {
          return (
            <WrapItem
              cursor="pointer"
              onClick={() => navigate.push(`/tutorial/${tutorial.link}`)}
            >
              <Center p="1.5rem" bg="palette.light" borderRadius="1rem">
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
