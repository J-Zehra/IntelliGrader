import { Center, Divider, Stack, Text, WrapItem } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { gradeState } from "@/state/gradeState";

export default function Streaks() {
  const gradeInfo = useRecoilValue(gradeState);

  const identifyHighestStreaks = () => {
    let currentStreak = 0;
    let highestStreak = 0;

    gradeInfo.gradedAnswerIndices.forEach((item) => {
      if (item === 1) {
        currentStreak += 1;
        if (currentStreak > highestStreak) {
          highestStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    });
    return highestStreak;
  };

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
          {identifyHighestStreaks()}
        </Text>
      </Center>
      <Divider borderColor="rgba(0, 0, 0, .3)" />
      <Center w="100%" fontSize=".8rem" flex={1} p=".6rem">
        <Text fontWeight="semibold">Streaks</Text>
      </Center>
    </WrapItem>
  );
}
