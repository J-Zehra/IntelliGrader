import { Input, Textarea } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { setupTestState } from "@/state/setupTestState";

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
      <Input
        placeholder="Number of Choices"
        type="number"
        bg="gray.100"
        h="3.5rem"
        value={testInfo.numberOfChoices === 0 ? "" : testInfo.numberOfChoices}
        onChange={handleNumberofChoicesChange}
      />
      <Textarea
        placeholder="Add Student"
        disabled
        bg="gray.100"
        h="6rem"
        p="1rem"
      >
        {/* <Tag size="md" borderRadius="full" variant="solid" colorScheme="green">
        <TagLabel>Green</TagLabel>
        <TagCloseButton />
      </Tag> */}
      </Textarea>
    </>
  );
}