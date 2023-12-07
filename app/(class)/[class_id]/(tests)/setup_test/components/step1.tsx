/* eslint-disable react/no-array-index-key */
import {
  Divider,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { setupTestState } from "@/state/setupTestState";
import { QuestionType, QuestionPart } from "@/utils/types";

export default function Step1() {
  const [testInfo, setTestInfo] = useRecoilState(setupTestState);

  const handleTestNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestInfo((prevTestInfo) => ({
      ...prevTestInfo,
      testName: e.target.value,
    }));
  };

  const handlePassingGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const grade = parseInt(e.target.value, 10);
    if (grade >= 40 && grade <= 100) {
      setTestInfo((prevTestInfo) => ({
        ...prevTestInfo,
        passingGrade: parseInt(e.target.value, 10),
      }));
    }
  };

  const createDefaultPart = (): QuestionPart => ({
    questionType: QuestionType.multipleChoice,
    numberOfChoices: 0,
    points: 0,
    totalNumber: 0,
  });

  const handleNumberOfPartsChange = (value: number) => {
    setTestInfo((prevTestInfo) => ({
      ...prevTestInfo,
      parts: Array.from({ length: value }, (_, index) =>
        index < prevTestInfo.parts.length
          ? prevTestInfo.parts[index]
          : createDefaultPart(),
      ),
    }));
  };

  const handleQuestionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const value = e.target.value as QuestionType;
    setTestInfo((prevTestInfo) => ({
      ...prevTestInfo,
      parts: prevTestInfo.parts.map((part, i) => {
        if (i === index) {
          return {
            ...part,
            questionType: value,
            numberOfChoices:
              value === QuestionType.trueOrFalse ? 2 : part.numberOfChoices,
          };
        }
        return part;
      }),
    }));
  };

  const handleNumberofChoicesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setTestInfo((prevTestInfo) => ({
      ...prevTestInfo,
      parts: prevTestInfo.parts.map((part, i) => {
        if (i === index) {
          return {
            ...part,
            numberOfChoices: parseInt(e.target.value, 10) || 0,
          };
        }
        return part;
      }),
    }));
  };

  const handlePointsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setTestInfo((prevTestInfo) => ({
      ...prevTestInfo,
      parts: prevTestInfo.parts.map((part, i) => {
        if (i === index) {
          return {
            ...part,
            points: parseInt(e.target.value, 10) || 0,
          };
        }
        return part;
      }),
    }));
  };

  const handleNumberOfQuestionsChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    setTestInfo((prevTestInfo) => ({
      ...prevTestInfo,
      parts: prevTestInfo.parts.map((part, i) => {
        if (i === index) {
          return {
            ...part,
            totalNumber: parseInt(e.target.value, 10) || 0,
          };
        }
        return part;
      }),
    }));
  };

  useEffect(() => {
    setTestInfo((prevTestInfo) => ({
      ...prevTestInfo,
      parts: Array.from({ length: 1 }, (_, index) =>
        index < prevTestInfo.parts.length
          ? prevTestInfo.parts[index]
          : createDefaultPart(),
      ),
    }));
  }, [setTestInfo]);

  return (
    <>
      <Input
        placeholder="Test Name"
        type="text"
        bg="gray.100"
        h="3.5rem"
        value={testInfo.testName}
        onChange={handleTestNameChange}
      />
      <RadioGroup
        colorScheme="blue"
        value={testInfo.parts.length.toString()}
        onChange={(e) => handleNumberOfPartsChange(parseInt(e, 10))}
      >
        <Stack direction="row" spacing="2rem">
          <Text paddingRight="1rem">Parts</Text>
          <Radio value="1">1</Radio>
          <Radio value="2">2</Radio>
          <Radio value="3">3</Radio>
          <Radio value="4">4</Radio>
        </Stack>
      </RadioGroup>
      <Divider paddingTop="1rem" />
      <Stack paddingTop="1rem" spacing="2rem">
        {testInfo.parts.map((part, index) => (
          <Stack key={index}>
            <Text
              paddingBottom="1rem"
              color="palette.text"
              fontWeight="semibold"
            >
              Part {index + 1}
            </Text>
            <Select
              color="rgba(0, 0, 0, .6)"
              bg="gray.100"
              h="3.5rem"
              placeholder="Number of Questions"
              value={part.totalNumber}
              onChange={(e) => handleNumberOfQuestionsChange(e, index)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </Select>
            <Select
              color="rgba(0, 0, 0, .6)"
              bg="gray.100"
              h="3.5rem"
              value={part.questionType}
              onChange={(e) => handleQuestionTypeChange(e, index)}
            >
              <option value={QuestionType.multipleChoice}>
                Multiple Choice
              </option>
              <option value={QuestionType.trueOrFalse}>True or False</option>
            </Select>
            {part.questionType !== QuestionType.trueOrFalse && (
              <Input
                placeholder="Number of Choices"
                type="number"
                bg="gray.100"
                h="3.5rem"
                value={part.numberOfChoices === 0 ? "" : part.numberOfChoices}
                onChange={(e) => handleNumberofChoicesChange(e, index)}
              />
            )}
            <Input
              placeholder="Points"
              type="number"
              bg="gray.100"
              h="3.5rem"
              value={part.points === 0 ? "" : part.points}
              onChange={(e) => handlePointsChange(e, index)}
            />
          </Stack>
        ))}
      </Stack>
      <Divider paddingTop="1rem" />
      <Stack>
        <Text paddingBottom="1rem" color="palette.text" fontWeight="semibold">
          Passing Grade (Percentage)
        </Text>
        <Input
          placeholder="Percentage"
          type="number"
          bg="gray.100"
          h="3.5rem"
          min={40}
          max={100}
          maxLength={3}
          defaultValue={50}
          onChange={handlePassingGradeChange}
        />
      </Stack>
    </>
  );
}
