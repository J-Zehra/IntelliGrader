/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";
import { Grade } from "@/utils/types";

export const gradeState = atom<Grade[]>({
  key: "gradeState",
  default: [],
});
