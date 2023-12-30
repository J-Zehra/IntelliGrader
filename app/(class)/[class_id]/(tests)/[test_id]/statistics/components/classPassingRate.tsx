import { Center, Divider, Stack, Text, WrapItem } from "@chakra-ui/react";
// import { useRecoilValue } from "recoil";
// import { gradeState } from "@/state/gradeState";

export default function ClassPassingRate({
  passingRate,
}: {
  passingRate: number | undefined;
}) {
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
          {passingRate || 0}%
        </Text>
      </Center>
      <Divider borderColor="rgba(0, 0, 0, .3)" />
      <Center w="100%" fontSize=".8rem" flex={1} p=".6rem">
        <Text fontWeight="semibold">Passing Rate</Text>
      </Center>
    </WrapItem>
  );
}
