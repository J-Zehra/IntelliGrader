/* eslint-disable react/no-array-index-key */
import { Center, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { QuestionPart, QuestionType } from "@/utils/types";

function convertToLetter(index: number, isTrueFalse: boolean) {
  if (isTrueFalse) {
    return index === 0 ? "True" : "False";
  }
  return String.fromCharCode("A".charCodeAt(0) + index);
}

export default function AnswerSheet({
  testPart,
  answerIndices,
}: {
  testPart: QuestionPart[] | undefined;
  answerIndices: number[] | undefined;
}) {
  return (
    <Stack spacing={3}>
      {testPart?.map((part, partIndex) => (
        <Stack key={partIndex} direction="column" borderRadius=".5rem">
          <Center
            bg="palette.button.secondary"
            marginBlock={2}
            p="1rem"
            borderRadius=".6rem"
          >
            <Text
              color="palette.button.primary"
              fontWeight="bold"
              fontSize="1.2rem"
            >
              {partIndex + 1}
            </Text>
          </Center>
          <Stack
            direction="column"
            borderRadius=".6rem"
            spacing={2.5}
            justify="space-between"
          >
            {[...Array(part.totalNumber)].map((_, questionIndex) => (
              <Stack
                key={`${partIndex}-${questionIndex}`}
                direction="row"
                boxShadow="1px 1px 5px rgba(0, 0, 100, .05)"
                borderRadius=".5rem"
              >
                <Center
                  flex={1}
                  bg="palette.button.secondary"
                  p="1rem"
                  borderLeftRadius=".6rem"
                >
                  <Text
                    color="palette.button.primary"
                    fontWeight="bold"
                    fontSize="1.2rem"
                  >
                    {questionIndex + 1}
                  </Text>
                </Center>
                <RadioGroup flex={10}>
                  <Stack
                    direction="row"
                    h="100%"
                    w="100%"
                    paddingInline="1rem"
                    align="center"
                    justify="start"
                    spacing="1.2rem"
                  >
                    {[...Array(part.numberOfChoices)].map((__, choiceIndex) => (
                      <Radio
                        isReadOnly
                        key={`${partIndex}-${questionIndex}-${choiceIndex}`}
                        opacity={0.8}
                        isChecked={
                          answerIndices &&
                          answerIndices[
                            questionIndex + partIndex * part.totalNumber
                          ] === choiceIndex
                        }
                        borderColor="palette.text"
                      >
                        <Text
                          opacity={0.6}
                          fontWeight="medium"
                          color="palette.text"
                          fontSize="1rem"
                        >
                          {convertToLetter(
                            choiceIndex,
                            part.questionType === QuestionType.trueOrFalse,
                          )}
                        </Text>
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Stack>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
