/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";
import { ClassVariant, TestInfo } from "@/utils/types";

export const setupTestState = atom<TestInfo>({
  key: "setupTestState",
  default: {
    classId: "",
    testName: "",
    answerIndices: [],
    parts: [],
    variant: ClassVariant.default,
    passingGrade: 50,
  },
});
