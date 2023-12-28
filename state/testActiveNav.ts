/* eslint-disable import/prefer-default-export */
import { TestNavLink } from "@/utils/types";
import { atom } from "recoil";

export const testActiveNavState = atom<TestNavLink>({
  key: "testActiveNav",
  default: TestNavLink.scan,
});
