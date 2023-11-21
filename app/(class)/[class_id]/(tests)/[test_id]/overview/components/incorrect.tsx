import { Center, Divider, Stack, Text, WrapItem } from "@chakra-ui/react";

export default function Incorrect({
  incorrect,
}: {
  incorrect: number | undefined;
}) {
  return (
    <WrapItem
      as={Stack}
      w="8rem"
      h="8.5rem"
      borderRadius=".5rem"
      bg="palette.background"
      border="1px solid"
      borderColor="rgba(0, 0, 0, .1)"
      spacing={0}
      paddingInline=".6rem"
      color="palette.text"
    >
      <Center w="100%" flex={10}>
        <Text fontSize="2rem" fontWeight="bold">
          {incorrect}
        </Text>
      </Center>
      <Divider />
      <Center w="100%" fontSize=".8rem" flex={1} p=".6rem">
        <Text fontWeight="semibold">Incorrect</Text>
      </Center>
    </WrapItem>
  );
}
