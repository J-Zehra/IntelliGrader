/* eslint-disable import/prefer-default-export */
import { ClassNavLink } from "@/utils/types";
import { atom } from "recoil";

export const classActiveNavState = atom<ClassNavLink>({
  key: "classActiveNav",
  default: ClassNavLink.home,
});
