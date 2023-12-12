/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { Box, Center, Radio, Stack, Text } from "@chakra-ui/react";
import { QuestionType } from "@/utils/types";

function convertToLetter(index: number) {
  return String.fromCharCode("A".charCodeAt(0) + index);
}

function convertToTorF(index: number) {
  if (index === 0) return "True";
  return "False";
}

export default function AnswerItem({
  index,
  numberOfChoices,
  answerIndex,
  correctAnswerIndex,
  questionType,
}: {
  index: number;
  correctAnswerIndex: number | undefined;
  answerIndex: number | undefined;
  numberOfChoices: number | undefined;
  questionType: QuestionType | undefined;
}) {
  const isCorrect = () => {
    if (correctAnswerIndex && answerIndex) {
      if (correctAnswerIndex === answerIndex) {
        return true;
      }

      return false;
    }
  };

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
      <Box flex={10}>
        {answerIndex === -1 ? (
          <Text>Unshaded</Text>
        ) : answerIndex === -2 ? (
          <Text>Multi Shaded</Text>
        ) : (
          <Stack
            direction="row"
            h="100%"
            w="100%"
            paddingInline="1rem"
            align="center"
            spacing={3}
          >
            {[...Array(numberOfChoices)].map((_, index2) => {
              return (
                <Radio
                  opacity={0.8}
                  isChecked={
                    isCorrect()
                      ? answerIndex === index2
                      : correctAnswerIndex === index2 || answerIndex === index2
                  }
                  colorScheme={
                    isCorrect()
                      ? "green"
                      : answerIndex === index2
                      ? "green"
                      : correctAnswerIndex === index2
                      ? "red"
                      : ""
                  }
                  key={index2}
                  isReadOnly
                  borderColor="palette.text"
                >
                  <Text
                    opacity={0.6}
                    fontWeight={
                      answerIndex === index2 || correctAnswerIndex === index2
                        ? "bold"
                        : "semibold"
                    }
                    fontSize="1rem"
                    color={
                      answerIndex === index2 && (isCorrect() || !isCorrect())
                        ? "green"
                        : correctAnswerIndex === index2 && !isCorrect()
                        ? "red"
                        : "palette.text"
                    }
                  >
                    {questionType === QuestionType.trueOrFalse
                      ? convertToTorF(index2)
                      : convertToLetter(index2)}
                  </Text>
                </Radio>
              );
            })}
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
