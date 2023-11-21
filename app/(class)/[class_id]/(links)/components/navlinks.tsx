/* eslint-disable import/prefer-default-export */
import { GiPapers } from "react-icons/gi";
import { MdHome, MdPeople, MdPieChart } from "react-icons/md";
import { ClassNavLink } from "@/utils/types";

export const navlinks = [
  {
    icon: <MdHome opacity={0.8} />,
    label: ClassNavLink.home,
    link: "dashboard",
  },
  {
    icon: <GiPapers opacity={0.8} />,
    label: ClassNavLink.tests,
    link: "tests",
  },
  {
    icon: <MdPeople opacity={0.8} />,
    label: ClassNavLink.students,
    link: "students",
  },
  {
    icon: <MdPieChart opacity={0.8} />,
    label: ClassNavLink.statistics,
    link: "statistics",
  },
];
