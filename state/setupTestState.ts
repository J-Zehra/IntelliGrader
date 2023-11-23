/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";
import { TestInfo } from "@/utils/types";

export const setupTestState = atom<TestInfo>({
  key: "setupTestState",
  default: {
    classId: "",
    testName: "",
    answerIndices: [],
    parts: [],
  },
});
