/* eslint-disable react/no-array-index-key */
import {
  Center,
  Divider,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { QuestionPart, QuestionType } from "@/utils/types";

function convertToLetter(index: number, isTrueFalse: boolean) {
  if (isTrueFalse) {
    return index === 0 ? "True" : "False";
  }
  return String.fromCharCode("A".charCodeAt(0) + index);
}

export default function MDATAnswerSheet({
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
            gap="1rem"
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
                <Stack h="100%" w="100%" padding="1rem">
                  <RadioGroup flex={10}>
                    <Wrap
                      direction="row"
                      align="center"
                      justify="start"
                      spacing="1rem"
                    >
                      {[...Array(part.numberOfChoices)].map(
                        (__, choiceIndex) => (
                          <WrapItem>
                            <Radio
                              isReadOnly
                              key={`${partIndex}-${questionIndex}-${choiceIndex}`}
                              isChecked={
                                answerIndices &&
                                answerIndices[
                                  questionIndex + partIndex * part.totalNumber
                                ] === choiceIndex
                              }
                              borderColor="rgba(0, 0, 0, .6)"
                            >
                              <Text
                                opacity={0.6}
                                fontWeight="medium"
                                color="palette.text"
                                fontSize=".9rem"
                              >
                                {convertToLetter(
                                  choiceIndex,
                                  part.questionType ===
                                    QuestionType.trueOrFalse,
                                )}
                              </Text>
                            </Radio>
                          </WrapItem>
                        ),
                      )}
                    </Wrap>
                  </RadioGroup>
                  <Stack>
                    <Divider marginBottom="1rem" marginTop="1rem" />
                    <Stack spacing="1rem">
                      {[...Array(part.numberOfChoices)].map(
                        (__, numberIndex) => {
                          return (
                            <Stack
                              direction="row"
                              spacing="1rem"
                              align="center"
                            >
                              <Text
                                opacity={0.6}
                                fontWeight="medium"
                                color="palette.text"
                                fontSize=".9rem"
                              >
                                {convertToLetter(
                                  numberIndex,
                                  part.questionType ===
                                    QuestionType.trueOrFalse,
                                )}
                              </Text>
                              <Divider w="1rem" />
                              <Text opacity={0.8}>
                                {
                                  part.mdatPoints![questionIndex].choices[
                                    numberIndex
                                  ].point
                                }
                                {part.mdatPoints![questionIndex].choices[
                                  numberIndex
                                ].point < 2
                                  ? " point"
                                  : " points"}
                              </Text>
                            </Stack>
                          );
                        },
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
