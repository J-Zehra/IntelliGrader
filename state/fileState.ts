/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";
import { UploadedFile } from "@/utils/types";

export const fileState = atom<UploadedFile[]>({
  key: "fileState",
  default: [],
});
