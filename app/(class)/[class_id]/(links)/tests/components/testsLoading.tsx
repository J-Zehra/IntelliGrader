import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

export default function TestsLoading() {
  return (
    <Stack spacing={2}>
      <Skeleton h="5.5rem" borderRadius="1rem" />
      <Skeleton h="5.5rem" opacity={0.6} borderRadius="1rem" />
      <Skeleton h="5.5rem" opacity={0.2} borderRadius="1rem" />
    </Stack>
  );
}
