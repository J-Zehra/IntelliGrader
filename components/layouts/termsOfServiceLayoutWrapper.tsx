"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { Box, IconButton, Stack } from "@chakra-ui/react";
import { BsArrowReturnLeft } from "react-icons/bs";
import CustomContainer from "../reusables/customContainer";

export default function TermsOfServiceLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useRouter();

  return (
    <CustomContainer>
      <Stack pt="5rem" pb="2rem" w="100%" align="start">
        <Box pb="1.2rem">
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
        </Box>
        {children}
      </Stack>
    </CustomContainer>
  );
}
