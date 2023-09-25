import { Center, Divider, Stack, Text, WrapItem } from "@chakra-ui/react";

export default function Streaks() {
  return (
    <WrapItem
      as={Stack}
      w="8rem"
      h="8.5rem"
      borderRadius=".5rem"
      bg="palette.button.secondary"
      spacing={0}
      paddingInline=".6rem"
      color="palette.button.primary"
    >
      <Center w="100%" flex={10}>
        <Text fontSize="2rem" fontWeight="bold">
          80%
        </Text>
      </Center>
      <Divider borderColor="rgba(0, 0, 0, .3)" />
      <Center w="100%" fontSize=".8rem" flex={1} p=".6rem">
        <Text fontWeight="semibold">Streaks</Text>
      </Center>
    </WrapItem>
  );
}
