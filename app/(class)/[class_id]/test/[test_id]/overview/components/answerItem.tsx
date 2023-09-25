/* eslint-disable react/no-array-index-key */
import { Center, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { gradeState } from "@/state/gradeState";

function convertToLetter(index: number) {
  return String.fromCharCode("A".charCodeAt(0) + index);
}

export default function AnswerItem({
  index,
  numberOfChoices,
}: {
  index: number;
  numberOfChoices: number | undefined;
}) {
  const gradeInfo = useRecoilValue(gradeState);
  return (
    <Stack bg="palette.light" direction="row" borderRadius=".5rem">
      <Center
        flex={1}
        bg="palette.button.secondary"
        p="1rem"
        borderLeftRadius=".5rem"
      >
        <Text
          color="palette.button.primary"
          fontWeight="bold"
          fontSize="1.2rem"
        >
          {index + 1}
        </Text>
      </Center>
      <RadioGroup flex={10}>
        <Stack
          direction="row"
          h="100%"
          w="100%"
          paddingInline="1rem"
          align="center"
          justify="space-between"
        >
          {[...Array(numberOfChoices)].map((_, index2) => {
            return (
              <Radio
                opacity={0.8}
                isChecked={index2 === gradeInfo.answerIndices[index]}
                key={index2}
                isReadOnly
                borderColor="palette.text"
              >
                <Text
                  opacity={0.6}
                  fontWeight="semibold"
                  color="palette.text"
                  fontSize="1rem"
                >
                  {convertToLetter(index2)}
                </Text>
              </Radio>
            );
          })}
        </Stack>
      </RadioGroup>
    </Stack>
  );
}
