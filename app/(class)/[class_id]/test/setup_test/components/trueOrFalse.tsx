/* eslint-disable react/no-array-index-key */
import { Center, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { setupTestState } from "@/state/setupTestState";

function convertToLetter(index: number) {
  return String.fromCharCode("A".charCodeAt(0) + index);
}

export default function TrueOrFalse() {
  const [testInfo, setTestInfo] = useRecoilState(setupTestState);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswerSelection = (
    questionIndex: number,
    choiceIndex: number,
  ) => {
    const newAnswers = [...answers];

    if (questionIndex === -1) {
      newAnswers.push(choiceIndex);
    } else {
      newAnswers[questionIndex] = choiceIndex;
    }

    setAnswers(newAnswers);

    setTestInfo((prevTestInfo) => ({
      ...prevTestInfo,
      answerIndices: newAnswers,
    }));
  };

  return (
    <Stack spacing={3}>
      {[...Array(testInfo.totalQuestions)].map((_, i) => {
        return (
          <Stack
            bg="palette.light"
            key={i}
            direction="row"
            borderRadius=".5rem"
          >
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
                {i + 1}
              </Text>
            </Center>
            <RadioGroup
              flex={10}
              onChange={(e) => handleAnswerSelection(i, parseInt(e, 10))}
            >
              <Stack
                direction="row"
                h="100%"
                w="100%"
                paddingInline="1rem"
                align="center"
                justify="start"
                spacing={3}
              >
                {[...Array(2)].map((choice, j) => {
                  return (
                    <Radio
                      opacity={0.8}
                      value={j.toString()}
                      key={choice}
                      borderColor="palette.text"
                    >
                      <Text
                        opacity={0.6}
                        fontWeight="semibold"
                        color="palette.text"
                        fontSize="1rem"
                      >
                        {convertToLetter(j)}
                      </Text>
                    </Radio>
                  );
                })}
              </Stack>
            </RadioGroup>
          </Stack>
        );
      })}
    </Stack>
  );
}
