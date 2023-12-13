/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";
import { FetchedGradeInfo } from "@/utils/types";

export const localGradeInfo = atom<FetchedGradeInfo[]>({
  key: "localGradeInfo",
  default: [],
});
