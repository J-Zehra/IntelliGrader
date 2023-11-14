import { Input, Select } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { setupTestState } from "@/state/setupTestState";
import { QuestionType } from "@/utils/types";

export default function Step1() {
  const [testInfo, setTestInfo] = useRecoilState(setupTestState);

  const handleTestNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const testInfoCopy = { ...testInfo };
    testInfoCopy.testName = e.target.value;
    setTestInfo(testInfoCopy);
  };

  const handleTotalQuestionsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const testInfoCopy = { ...testInfo };
    testInfoCopy.totalQuestions = parseInt(e.target.value, 10);
    setTestInfo(testInfoCopy);
  };

  const handleNumberofChoicesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const testInfoCopy = { ...testInfo };
    testInfoCopy.numberOfChoices = parseInt(e.target.value, 10);
    setTestInfo(testInfoCopy);
  };

  const handleQuestionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const testInfoCopy = { ...testInfo };
    testInfoCopy.questionType = e.target.value as QuestionType;
    setTestInfo(testInfoCopy);
  };

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
      <Input
        placeholder="Total Questions"
        type="number"
        bg="gray.100"
        h="3.5rem"
        value={testInfo.totalQuestions === 0 ? "" : testInfo.totalQuestions}
        onChange={handleTotalQuestionsChange}
      />
      <Select
        color="rgba(0, 0, 0, .6)"
        bg="gray.100"
        h="3.5rem"
        onChange={handleQuestionTypeChange}
      >
        <option value={QuestionType.multipleChoice}>Multiple Choice</option>
        <option value={QuestionType.trueOrFalse}>True or False</option>
        <option value={QuestionType.combination}>Combination</option>
      </Select>
      {testInfo.questionType !== QuestionType.trueOrFalse ? (
        <Input
          placeholder="Number of Choices"
          type="number"
          bg="gray.100"
          h="3.5rem"
          value={testInfo.numberOfChoices === 0 ? "" : testInfo.numberOfChoices}
          onChange={handleNumberofChoicesChange}
        />
      ) : null}
    </>
  );
}
