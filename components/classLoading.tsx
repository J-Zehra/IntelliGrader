import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

export default function ClassLoading() {
  return (
    <Stack spacing={3}>
      <Skeleton h="6rem" borderRadius=".5rem" />
      <Skeleton h="6rem" opacity={0.8} borderRadius=".5rem" />
      <Skeleton h="6rem" opacity={0.6} borderRadius=".5rem" />
      <Skeleton h="6rem" opacity={0.4} borderRadius=".5rem" />
      <Skeleton h="6rem" opacity={0.2} borderRadius=".5rem" />
    </Stack>
  );
}
