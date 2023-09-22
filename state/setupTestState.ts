/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";
import { TestInfo } from "@/utils/types";

export const setupTestState = atom<TestInfo>({
  key: "setupTestState",
  default: {
    classId: "",
    testName: "",
    totalQuestions: 0,
    numberOfChoices: 0,
    answerIndices: [],
    points: 0,
  },
});
