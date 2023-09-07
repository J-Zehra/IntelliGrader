"use client";

import { Box, Stack, Text, Button, Input, IconButton } from "@chakra-ui/react";
import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import CustomContainer from "@/components/reusables/customContainer";

export default function CreateClass() {
  const navigate = useRouter();

  return (
    <CustomContainer>
      <Stack pt="6rem" spacing="2.5rem">
        <Stack w="100%" direction="row" justify="space-between" align="center">
          <IconButton
            aria-label="Return"
            p=".8rem"
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
        <Stack spacing="1.2rem">
          <Input
            placeholder="Class name"
            type="text"
            bg="gray.100"
            h="3.5rem"
          />
          <Input placeholder="Section" type="text" bg="gray.100" h="3.5rem" />
          <Input placeholder="Subject" type="text" bg="gray.100" h="3.5rem" />
          <Input
            placeholder="Total Student"
            type="number"
            bg="gray.100"
            h="3.5rem"
          />
        </Stack>

        <Stack direction="row" align="center" justify="end" spacing="1rem">
          <Button variant="ghost" onClick={() => navigate.back()}>
            Cancel
          </Button>
          <Button leftIcon={<AiOutlinePlus />} p="1.6rem 1.2rem">
            Create class
          </Button>
        </Stack>
      </Stack>
    </CustomContainer>
  );
}
