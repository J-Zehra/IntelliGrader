import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

export default function Loading() {
  return (
    <Stack spacing={2}>
      <Skeleton h="3.5rem" borderRadius=".5rem" />
      <Skeleton h="3.5rem" opacity={0.8} borderRadius=".5rem" />
      <Skeleton h="3.5rem" opacity={0.6} borderRadius=".5rem" />
      <Skeleton h="3.5rem" opacity={0.4} borderRadius=".5rem" />
      <Skeleton h="3.5rem" opacity={0.2} borderRadius=".5rem" />
    </Stack>
  );
}
