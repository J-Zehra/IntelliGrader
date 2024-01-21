/* eslint-disable react/no-array-index-key */
import {
  Center,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { setupTestState } from "@/state/setupTestState";
import { QuestionType, TestInfo } from "@/utils/types";

export default function AnswerSheet() {
  const [testInfo, setTestInfo] = useRecoilState<TestInfo>(setupTestState);
  const [answers, setAnswers] = useState<number[]>([]);

  const convertToLetter = useCallback((index: number, isTrueFalse: boolean) => {
    if (isTrueFalse) {
      return index === 0 ? "True" : "False";
    }
    return String.fromCharCode("A".charCodeAt(0) + index);
  }, []);

  const handleAnswerSelection = React.useCallback(
    (partIndex: number, questionIndex: number, choiceIndex: number) => {
      const newAnswers = [...answers];
      const questionAbsoluteIndex =
        testInfo.parts
          .slice(0, partIndex)
          .reduce((acc, part) => acc + part.totalNumber, 0) + questionIndex;
      newAnswers[questionAbsoluteIndex] = choiceIndex;

      setAnswers(newAnswers);

      setTestInfo((prevTestInfo) => ({
        ...prevTestInfo,
        answerIndices: newAnswers,
      }));
    },
    [answers, setAnswers, setTestInfo, testInfo.parts],
  );

  return (
    <Stack spacing={3}>
      {testInfo.parts.map((part, partIndex) => (
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
            {Array.from({ length: part.totalNumber }).map(
              (_, questionIndex) => (
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
                  <RadioGroup
                    flex={10}
                    onChange={(e) =>
                      handleAnswerSelection(
                        partIndex,
                        questionIndex,
                        parseInt(e, 10),
                      )
                    }
                  >
                    <Wrap
                      direction="row"
                      h="100%"
                      w="100%"
                      p="1rem"
                      align="center"
                      justify="start"
                      spacing="1rem"
                    >
                      {[...Array(part.numberOfChoices)].map(
                        (__, choiceIndex) => (
                          <WrapItem>
                            <Radio
                              key={`${partIndex}-${questionIndex}-${choiceIndex}`}
                              opacity={0.8}
                              value={choiceIndex.toString()}
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
                </Stack>
              ),
            )}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
