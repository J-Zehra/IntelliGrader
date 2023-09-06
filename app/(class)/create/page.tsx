"use client";

import {
  Box,
  Center,
  Stack,
  Text,
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import CustomContainer from "@/components/reusables/customContainer";

export default function CreateClass() {
  const navigate = useRouter();

  return (
    <CustomContainer>
      <Stack pt="6rem" spacing={5}>
        <Stack w="100%" direction="row" justify="space-between" align="center">
          <Center
            p=".8rem"
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
              Setup a class
            </Text>
            <Box w=".5rem" h=".5rem" bg="palette.accent" borderRadius="5rem" />
          </Stack>
        </Stack>

        <FormControl id="className">
          <Text
            fontSize=".9rem"
            color="palette.button.primary"
            fontWeight="semibold"
            opacity=".8"
          />
          <Input
            placeholder="Class name"
            color="gray.500"
            bg="gray.100"
            h="3rem" // Adjust the height here as needed
          />
        </FormControl>

        <FormControl id="section">
          <Text
            fontSize=".9rem"
            color="palette.button.primary"
            fontWeight="semibold"
            opacity=".8"
          />
          <Input
            placeholder="Section"
            color="gray.500"
            bg="gray.100"
            h="3rem" // Adjust the height here as needed
          />
        </FormControl>

        <FormControl id="subject">
          <Text
            fontSize=".9rem"
            color="palette.button.primary"
            fontWeight="semibold"
            opacity=".8"
          />
          <Input
            placeholder="Subject"
            color="gray.500"
            bg="gray.100"
            h="3rem" // Adjust the height here as needed
          />
        </FormControl>

        <FormControl id="TotalStudent">
          <Text
            fontSize=".9rem"
            color="palette.button.primary"
            fontWeight="semibold"
            opacity=".8"
          />
          <Input
            placeholder="Total Student"
            color="gray.500"
            bg="gray.100"
            h="3rem" // Adjust the height here as needed
          />
        </FormControl>

        <Stack
          direction="row"
          align="center"
          justify="center"
          position="absolute"
          bottom="-6rem"
          left="90"
          right="0"
        >
          {/* CANCEL button */}
          <Center
            p=".9rem"
            fontSize="14"
            color="palette.button.primary"
            cursor="pointer"
            borderRadius="5rem"
            onClick={() => {
              // Handle cancel action
            }}
          >
            CANCEL
          </Center>

          {/* + CREATE CLASS button */}
          <Button
            colorScheme="blue"
            size="lg"
            fontSize="15"
            onClick={() => {
              // Handle create class action
            }}
          >
            + CREATE CLASS
          </Button>
        </Stack>
      </Stack>
    </CustomContainer>
  );
}
