import { Center, Stack, Text } from "@chakra-ui/react";
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
      <Stack direction="row" w="100%" justify="space-between" align="start">
        <Stack spacing={0.1}>
          <Text fontWeight="bold" fontSize="1rem" opacity=".8">
            System Analysis and Design
          </Text>
          <Text fontSize=".9rem" fontWeight="semibold" color="palette.accent">
            BSIT 3
          </Text>
        </Stack>
        <Center p=".1rem" cursor="pointer" fontSize="1.2rem" opacity=".8">
          <AiOutlineMore />
        </Center>
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
        <Stack color="palette.button.primary" direction="row" spacing={4}>
          <Center p=".1rem" fontSize="1.2rem" cursor="pointer" opacity=".8">
            <BsBarChartLine />
          </Center>
          <Center p=".1rem" cursor="pointer" fontSize="1.2rem" opacity=".8">
            <AiOutlineScan />
          </Center>
        </Stack>
      </Stack>
    </Stack>
  );
}
