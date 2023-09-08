"use client";

import { Stack, Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function CreateClass() {
  const navigate = useRouter();
  return (
    <>
      <Stack spacing="1.2rem">
        <Input placeholder="Class name" type="text" bg="gray.100" h="3.5rem" />
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
        <Button leftIcon={<AiOutlinePlus />} p="1.6rem 1rem">
          Create class
        </Button>
      </Stack>
    </>
  );
}
