"use client";

import { Box, Center, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import CustomContainer from "@/components/reusables/customContainer";
import RecentScans from "../components/recentScans";
import Tests from "../components/tests";

export default function ClassPage() {
  const navigate = useRouter();

  return (
    <CustomContainer>
      <Stack pt="6rem" spacing={5}>
        <Stack w="100%" direction="row" justify="space-between" align="center">
          <Center
            p=".5rem"
            fontSize="1.2rem"
            color="palette.button.primary"
            cursor="pointer"
            borderRadius=".2rem"
            onClick={() => navigate.back()}
          >
            <BsArrowReturnLeft />
          </Center>
          <Stack direction="row" align="center">
            <Text
              fontSize=".9rem"
              color="palette.button.primary"
              fontWeight="semibold"
              opacity=".8"
            >
              System Anaysis and Design
            </Text>
            <Box w=".5rem" h=".5rem" bg="palette.accent" borderRadius="5rem" />
          </Stack>
        </Stack>
        <RecentScans />
        <Tests />
      </Stack>
    </CustomContainer>
  );
}
