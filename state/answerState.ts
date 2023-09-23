/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";
import { ProcessedImageData } from "@/utils/types";

export const processedImageState = atom<ProcessedImageData>({
  key: "processedImageState",
  default: { processed_image: "", answerIndices: [] },
});
