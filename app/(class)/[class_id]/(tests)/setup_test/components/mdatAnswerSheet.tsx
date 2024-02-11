/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
import {
  Center,
  Divider,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { setupTestState } from "@/state/setupTestState";
import { QuestionType, TestInfo } from "@/utils/types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { setupTestStepState } from "@/state/stepState";
import PointInput from "./pointInput";

export default function MDATAnswerSheet() {
  const [testInfo, setTestInfo] = useRecoilState<TestInfo>(setupTestState);
  const toast = useToast();
  const setActiveStep = useSetRecoilState(setupTestStepState);

  const [answers, setAnswers] = useState<number[]>(
    Array.from(
      {
        length: testInfo.parts.reduce(
          (acc, current) => acc + current.totalNumber,
          0,
        ),
      },
      () => -1,
    ),
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentPartIndex, setCurrentPartIndex] = useState<number>(0);

  const convertToLetter = useCallback((index: number, isTrueFalse: boolean) => {
    if (isTrueFalse) {
      return index === 0 ? "True" : "False";
    }
    return String.fromCharCode("A".charCodeAt(0) + index);
  }, []);

  const handleAnswerSelection = (choiceIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = choiceIndex;

    setAnswers(newAnswers);

    setTestInfo((prevTestInfo) => ({
      ...prevTestInfo,
      answerIndices: newAnswers,
    }));
  };

  useEffect(() => {
    setTestInfo((prevTestInfo) => ({
      ...prevTestInfo,
      parts: prevTestInfo.parts.map((part) => ({
        ...part,
        mdatPoints: Array.from({ length: part.totalNumber }, (_, i) => ({
          number: i + 1,
          choices: Array.from({ length: part.numberOfChoices }, (_, j) => ({
            choice: convertToLetter(
              j,
              part.questionType === QuestionType.trueOrFalse,
            ),
            point: 0,
          })),
        })),
      })),
    }));
  }, [convertToLetter, setTestInfo]);

  const calculateIndex = (partIndex: number, currentI: number) => {
    let currentIndexInPart = currentI;

    // Iterate through previous parts and subtract their total numbers
    for (let i = 0; i < partIndex; i += 1) {
      currentIndexInPart -= testInfo.parts[i].totalNumber;
    }

    return currentIndexInPart;
  };

  const handleNext = () => {
    if (
      !testInfo.parts[currentPartIndex].mdatPoints![
        calculateIndex(currentPartIndex, currentIndex)
      ].choices.some((item) => item.point > 0)
    ) {
      toast({
        title: "Points are all 0",
        description: "Set atleast one choice's point to non-zero",
        status: "error",
        duration: 3000,
        position: "top",
      });
      return;
    }

    if (
      currentIndex ===
      testInfo.parts.reduce((acc, current) => acc + current.totalNumber, 0) - 1
    ) {
      setActiveStep((prev) => prev + 1);
    }

    const sumUpToIndex = (array: TestInfo, endIndex: number) => {
      let sum = 0;

      for (let i = 0; i <= endIndex; i += 1) {
        sum += array.parts[i].totalNumber;
      }

      return sum;
    };

    const totalMaxNumber =
      testInfo.parts.reduce(
        (accum, current) => accum + current.totalNumber,
        0,
      ) - 1;

    if (currentIndex === totalMaxNumber) {
      return;
    }

    if (currentIndex === sumUpToIndex(testInfo, currentPartIndex) - 1) {
      setCurrentPartIndex((prev) => prev + 1);

      // Reset RadioGroup state when moving to the next part
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        for (let i = currentIndex + 1; i <= totalMaxNumber; i += 1) {
          newAnswers[i] = -1;
        }
        return newAnswers;
      });
    }

    setCurrentIndex((prev) => Math.min(prev + 1, totalMaxNumber));
  };

  const handlePrev = () => {
    const sumUpToIndex = (array: TestInfo, endIndex: number) => {
      let sum = 0;

      for (let i = 0; i <= endIndex; i += 1) {
        sum += array.parts[i].totalNumber;
      }

      return sum;
    };

    if (currentIndex === 0) {
      return;
    }

    if (currentIndex === sumUpToIndex(testInfo, currentPartIndex - 1)) {
      setCurrentPartIndex((prev) => prev - 1);
    }

    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    setTestInfo((prev) => ({
      ...prev,
      answerIndices: Array.from(
        {
          length: prev.parts.reduce(
            (acc, current) => acc + current.totalNumber,
            0,
          ),
        },
        () => -1,
      ),
    }));
  }, []);

  return (
    <Stack spacing={3}>
      <Stack direction="column" borderRadius=".5rem">
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
            Part {currentPartIndex + 1}
          </Text>
        </Center>
        <Stack
          key={currentIndex}
          direction="column"
          borderRadius=".6rem"
          spacing={2.5}
          pos="relative"
          justify="space-between"
          as={motion.div}
          initial={{
            x: 30,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
        >
          <Stack direction="row" pos="absolute" bottom="1rem" right="1rem">
            {currentIndex !== 0 ? (
              <IconButton
                variant="ghost"
                aria-label="Prev"
                icon={<FaArrowLeft />}
                onClick={handlePrev}
              />
            ) : null}

            <IconButton
              onClick={handleNext}
              isDisabled={testInfo.answerIndices[currentIndex] === -1}
              aria-label="Next"
              icon={<FaArrowRight />}
            />
          </Stack>
          <Stack
            key={`${currentPartIndex}-${currentIndex}`}
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
                {currentIndex + 1}
              </Text>
            </Center>
            <Stack h="100%" w="100%" p="1rem" spacing="1.5rem">
              <RadioGroup
                flex={10}
                onChange={(e) => handleAnswerSelection(parseInt(e, 10))}
                value={testInfo.answerIndices[currentIndex]?.toString()}
              >
                <Wrap
                  direction="row"
                  align="center"
                  justify="start"
                  spacing="1rem"
                >
                  {[
                    ...Array(testInfo.parts[currentPartIndex].numberOfChoices),
                  ].map((__, choiceIndex) => (
                    <WrapItem>
                      <Radio
                        key={`${currentPartIndex}-${currentIndex}-${choiceIndex}`}
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
                            testInfo.parts[currentPartIndex].questionType ===
                              QuestionType.trueOrFalse,
                          )}
                        </Text>
                      </Radio>
                    </WrapItem>
                  ))}
                </Wrap>
              </RadioGroup>
              <Stack>
                <Divider marginBottom="1rem" />
                <Stack spacing="1rem">
                  {[
                    ...Array(testInfo.parts[currentPartIndex].numberOfChoices),
                  ].map((__, choiceIndex) => {
                    return (
                      <PointInput
                        partIndex={currentPartIndex}
                        questionIndex={calculateIndex(
                          currentPartIndex,
                          currentIndex,
                        )}
                        choiceIndex={choiceIndex}
                        questionType={
                          testInfo.parts[currentPartIndex].questionType
                        }
                      />
                    );
                  })}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
