/* eslint-disable import/prefer-default-export */
import {
  CiCircleInfo,
  CiFileOn,
  CiViewList,
  CiWavePulse1,
} from "react-icons/ci";
import { AiOutlineScan } from "react-icons/ai";
import { TestNavLink } from "@/utils/types";

export const navlinks = [
  {
    icon: <CiCircleInfo opacity={0.8} />,
    label: TestNavLink.settings,
    link: "about",
  },
  {
    icon: <CiFileOn opacity={0.8} />,
    label: TestNavLink.file,
  },
  {
    icon: <AiOutlineScan opacity={0.8} />,
    label: TestNavLink.scan,
  },
  {
    icon: <CiViewList opacity={0.8} />,
    label: TestNavLink.grades,
    link: "student_grades",
  },
  {
    icon: <CiWavePulse1 opacity={0.8} />,
    label: TestNavLink.statistics,
    link: "statistics",
  },
];
