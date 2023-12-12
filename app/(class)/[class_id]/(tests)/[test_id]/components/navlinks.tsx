/* eslint-disable import/prefer-default-export */
import { CiCircleInfo, CiFileOn } from "react-icons/ci";
import { AiOutlineScan } from "react-icons/ai";
import { MdOutlineAnalytics, MdPeopleOutline } from "react-icons/md";
import { TestNavLink } from "@/utils/types";

export const navlinks = [
  {
    icon: <CiCircleInfo opacity={0.8} />,
    label: TestNavLink.settings,
    link: "settings",
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
    icon: <MdPeopleOutline opacity={0.8} />,
    label: TestNavLink.grades,
    link: "student_grades",
  },
  {
    icon: <MdOutlineAnalytics opacity={0.8} />,
    label: TestNavLink.statistics,
    link: "statistics",
  },
];
