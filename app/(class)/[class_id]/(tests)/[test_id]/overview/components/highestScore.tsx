import { Center, Divider, Stack, Text, WrapItem } from "@chakra-ui/react";

export default function HighestScore({ score }: { score: number | undefined }) {
  return (
    <WrapItem
      as={Stack}
      w="8rem"
      h="8.5rem"
      borderRadius=".5rem"
      bg="palette.light"
      spacing={0}
      paddingInline=".6rem"
      color="palette.text"
    >
      <Center w="100%" flex={10}>
        <Text fontSize="2rem" fontWeight="bold">
          {score || 0}
        </Text>
      </Center>
      <Divider borderColor="rgba(0, 0, 0, .2)" />
      <Center w="100%" fontSize=".8rem" flex={1} p=".6rem">
        <Text fontWeight="semibold">Highest</Text>
      </Center>
    </WrapItem>
  );
}
