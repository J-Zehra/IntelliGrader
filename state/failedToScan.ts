/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";

export const failedToScan = atom<{ status: string; image: Buffer }[]>({
  key: "failedToScan",
  default: [],
});
