import { Center, Divider, Stack, Text, WrapItem } from "@chakra-ui/react";

export default function TotalPassingRate({
  rate,
}: {
  rate: number | undefined;
}) {
  return (
    <WrapItem
      as={Stack}
      w="8rem"
      h="8.5rem"
      borderRadius=".5rem"
      bg="palette.accent"
      spacing={0}
      paddingInline=".6rem"
      color="palette.background"
    >
      <Center w="100%" flex={10}>
        <Text fontSize="2rem" fontWeight="bold">
          {`${rate || 0}%`}
        </Text>
      </Center>
      <Divider />
      <Center w="100%" fontSize=".8rem" flex={1} p=".6rem">
        <Text fontWeight="semibold">Passing Rate</Text>
      </Center>
    </WrapItem>
  );
}
