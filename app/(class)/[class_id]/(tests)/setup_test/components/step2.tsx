/* eslint-disable react/no-array-index-key */

import { useRecoilValue } from "recoil";
import { setupTestState } from "@/state/setupTestState";
import { QuestionType } from "@/utils/types";
import MultipleChoice from "./multipleChoice";
import TrueOrFalse from "./trueOrFalse";
import Combination from "./combination";

export default function Step2() {
  const testInfo = useRecoilValue(setupTestState);

  console.log(testInfo);

  if (testInfo.questionType === QuestionType.multipleChoice) {
    return <MultipleChoice />;
  }

  if (testInfo.questionType === QuestionType.trueOrFalse) {
    return <TrueOrFalse />;
  }

  if (testInfo.questionType === QuestionType.combination) {
    return <Combination />;
  }
}
