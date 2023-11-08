/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";

export const setupTestStepState = atom({
  key: "setupTestState",
  default: 0,
});

export const createClassStepState = atom({
  key: "createClassState",
  default: 0,
});
