import { IconButton, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineMore, AiOutlineScan } from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";

export default function Class() {
  return (
    <Stack
      bg="palette.light"
      p="1rem"
      borderRadius=".5rem"
      pos="relative"
      boxShadow="0 2px 5px rgba(0, 0, 50, .2)"
    >
      <Stack direction="row" w="100%" justify="space-between">
        <Stack spacing={0.1}>
          <Text fontWeight="bold" fontSize="1.2rem" opacity=".8">
            System Analysis and Design
          </Text>
          <Text fontSize=".9rem" fontWeight="medium" color="palette.accent">
            BSIT 3
          </Text>
        </Stack>
        <AiOutlineMore />
      </Stack>
      <Stack direction="row" w="100%" align="end" justify="end">
        <Text
          fontWeight="black"
          fontSize="4rem"
          color="palette.accent"
          opacity=".05"
          pos="absolute"
          left="1rem"
          bottom={0}
        >
          BSIT 3
        </Text>
        <Stack direction="row" spacing={0.5}>
          <IconButton
            aria-label="statistics"
            variant="none"
            opacity=".8"
            color="palette.button.primary"
            fontSize="1.2rem"
            icon={<BsBarChartLine />}
          />
          <IconButton
            aria-label="scan"
            variant="none"
            opacity=".8"
            color="palette.button.primary"
            fontSize="1.2rem"
            icon={<AiOutlineScan />}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
