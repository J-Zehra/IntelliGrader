/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";
import { ClassInfo, ClassVariant, StudentInfo } from "@/utils/types";

export const classInfoState = atom<ClassInfo>({
  key: "classInfoState",
  default: {
    program: "",
    section: "",
    course: "",
    year: 0,
    variant: ClassVariant.default,
    students: [],
  },
});

export const classListState = atom<StudentInfo[]>({
  key: "classListState",
  default: [],
});
