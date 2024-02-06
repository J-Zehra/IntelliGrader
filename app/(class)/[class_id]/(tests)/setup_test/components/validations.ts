import { TestInfo } from "@/utils/types";

export const isBasicInfoComplete = (testInfo: TestInfo) => {
  let isError = false;

  if (!testInfo.testName) {
    isError = true;
  }

  if (
    testInfo.format === "Regular" &&
    testInfo.parts.some((item) => item.points === 0)
  ) {
    isError = true;
  }

  testInfo.parts.forEach((part) => {
    if (part.numberOfChoices === 0 || part.totalNumber === 0) {
      isError = true;
    }
  });

  console.log(isError);

  return isError;
};

export const isAnswerSheetComplete = (testInfo: TestInfo) => {
  const { parts } = testInfo;

  for (let partIndex = 0; partIndex < parts.length; partIndex += 1) {
    const part = parts[partIndex];

    for (
      let questionIndex = 0;
      questionIndex < part.totalNumber;
      questionIndex += 1
    ) {
      const questionAbsoluteIndex =
        parts
          .slice(0, partIndex)
          .reduce((acc, item) => acc + item.totalNumber, 0) + questionIndex;

      if (testInfo.answerIndices[questionAbsoluteIndex] === undefined) {
        return false;
      }
    }
  }

  return true;
};
