/* eslint-disable react/no-array-index-key */

import { useRecoilValue } from "recoil";
import { setupTestState } from "@/state/setupTestState";
import AnswerSheet from "./answerSheet";

export default function Step2() {
  const testInfo = useRecoilValue(setupTestState);

  console.log(testInfo);

  return <AnswerSheet />;
}
