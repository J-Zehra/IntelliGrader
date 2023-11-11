/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";

export const setupTestStepState = atom({
  key: "setupTestStepState",
  default: 0,
});

export const createClassStepState = atom({
  key: "createClassStepState",
  default: 0,
});
