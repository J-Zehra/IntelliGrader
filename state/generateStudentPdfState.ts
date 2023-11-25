/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";

export const generateStudentPdfState = atom<{
  classId: string;
  testId: string;
  studentId: string[];
}>({
  key: "generateStudentPdfState",
  default: { classId: "", testId: "", studentId: [] },
});
