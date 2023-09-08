"use client";

import React, { ReactNode } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { Box, IconButton, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import CustomContainer from "../reusables/customContainer";

export default function CreateClassLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useRouter();

  return (
    <CustomContainer>
      <Stack pt="6rem" spacing="2.5rem">
        <Stack w="100%" direction="row" justify="space-between" align="center">
          <IconButton
            aria-label="Return"
            p=".5rem"
            variant="ghost"
            fontSize="1.2rem"
            color="palette.button.primary"
            cursor="pointer"
            borderRadius=".2rem"
            onClick={() => navigate.back()}
          >
            <BsArrowReturnLeft />
          </IconButton>
          <Stack direction="row" align="center">
            <Text
              fontSize=".9rem"
              color="palette.button.primary"
              fontWeight="semibold"
              opacity=".8"
            >
              Setup class
            </Text>
            <Box w=".5rem" h=".5rem" bg="palette.accent" borderRadius="5rem" />
          </Stack>
        </Stack>
        {children}
      </Stack>
    </CustomContainer>
  );
}
