import { Box, Stack, Text } from "@chakra-ui/react";

export default function RecentScans() {
  return (
    <Stack>
      <Text fontSize=".8rem" fontWeight="medium">
        Recent Scans
      </Text>
      <Box w="100%" h="12rem" bg="palette.light" borderRadius=".5rem" />
    </Stack>
  );
}
