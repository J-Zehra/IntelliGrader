import { Center, Divider, Stack, Text, WrapItem } from "@chakra-ui/react";
// import { useRecoilValue } from "recoil";
// import { gradeState } from "@/state/gradeState";

export default function Streaks({
  correctIndices,
  studentIndices,
}: {
  correctIndices: number[] | undefined;
  studentIndices: number[] | undefined;
}) {
  // const gradeInfo = useRecoilValue(gradeState);

  let currentStreak = 0;
  let maxStreak = 0;

  if (correctIndices && studentIndices) {
    for (let i = 0; i < correctIndices.length; i += 1) {
      const isCorrect = correctIndices![i] === studentIndices![i];

      if (isCorrect) {
        currentStreak += 1;
        // Update maxStreak if needed
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      } else {
        // Reset currentStreak on incorrect answer
        currentStreak = 0;
      }
    }
  }

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
          {maxStreak}
        </Text>
      </Center>
      <Divider borderColor="rgba(0, 0, 0, .3)" />
      <Center w="100%" fontSize=".8rem" flex={1} p=".6rem">
        <Text fontWeight="semibold">Streaks</Text>
      </Center>
    </WrapItem>
  );
}
