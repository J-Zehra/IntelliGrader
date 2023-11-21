/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";
import { FetchedStudentInfo } from "@/utils/types";

export const studentsState = atom<FetchedStudentInfo[]>({
  key: "studentsState",
  default: [],
});
