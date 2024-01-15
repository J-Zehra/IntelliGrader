/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */

"use client";

import {
  Button,
  Center,
  Skeleton,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Grade, TestNavLink } from "@/utils/types";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import useTestObserver from "@/hooks/useTestObserver";
import StudentGradeItemRest from "./components/studentGradeItemRest";
import StudentGradeItem from "./components/studentGradeItem";
import DownloadReport from "./components/downloadReport";

export default function StudentGrades() {
  const { test_id } = useParams();
  const { ref } = useTestObserver(TestNavLink.grades);
  const navigate = useRouter();

  const getStudentGrades = async () => {
    const id = test_id;
    let studentGrade: Grade[] = [];
    await axios.get(`/api/student_grades/${id}`).then((res) => {
      studentGrade = res.data;
    });

    return studentGrade;
  };

  const { data: studentGrades, isLoading } = useQuery({
    queryFn: getStudentGrades,
    queryKey: ["get-student-grades", test_id],
  });
  const [isDesktopLayout] = useMediaQuery("(min-width: 40em)");

  const passed = studentGrades?.filter((grade) => grade.status === "Passed");
  const failed = studentGrades?.filter((grade) => grade.status === "Failed");

  return (
    <Center w="100%">
      <Stack
        spacing={2}
        paddingBottom="10rem"
        ref={ref}
        w={isDesktopLayout ? "40rem" : "100%"}
      >
        <Stack direction="row" w="100%" justify="space-between" align="center">
          <Text fontSize=".8rem" fontWeight="normal">
            Total of {studentGrades?.length}{" "}
            {studentGrades && studentGrades?.length < 2 ? "paper" : "papers"}
          </Text>
        </Stack>
        <Stack
          w="100%"
          paddingTop="1rem"
          spacing={isDesktopLayout ? "1rem" : ".5rem"}
          direction={isDesktopLayout ? "row" : "column"}
        >
          <DownloadReport />
          <Button
            w="100%"
            bg="transparent"
            color="palette.accent"
            border="1px solid #035EDD"
            boxShadow="none"
            fontSize=".9rem"
            onClick={() => navigate.push("pdf/graded")}
          >
            Generate Graded Tests
          </Button>
        </Stack>
        {passed && passed?.length > 0 ? (
          <Stack paddingTop="1.5rem" direction="row" align="center">
            <Text fontSize=".8rem">Passed</Text>
            <FaCheck />
          </Stack>
        ) : null}
        <Stack marginTop={1} spacing={3}>
          {!isLoading
            ? passed?.map((grades: Grade, index) => {
                return index === 0 ? (
                  <StudentGradeItem
                    grade={grades}
                    key={grades.student.rollNumber}
                  />
                ) : (
                  <StudentGradeItemRest
                    grade={grades}
                    key={grades.student.rollNumber}
                  />
                );
              })
            : [0.8, 0.6, 0.4].map((item) => {
                return (
                  <Skeleton
                    isLoaded={!isLoading}
                    key={item}
                    opacity={item}
                    borderRadius=".5rem"
                    h="5rem"
                  />
                );
              })}
        </Stack>
        {failed && failed?.length > 0 ? (
          <Stack paddingTop="1.5rem" direction="row" align="center">
            <Text fontSize=".8rem">Failed</Text>
            <FaTimes />
          </Stack>
        ) : null}
        <Stack marginTop={1} spacing={3}>
          {!isLoading
            ? failed?.map((grades: Grade) => {
                return (
                  <StudentGradeItemRest
                    grade={grades}
                    key={grades.student.rollNumber}
                  />
                );
              })
            : [0.8, 0.6, 0.4].map((item) => {
                return (
                  <Skeleton
                    isLoaded={!isLoading}
                    key={item}
                    opacity={item}
                    borderRadius=".5rem"
                    h="5rem"
                  />
                );
              })}
        </Stack>
      </Stack>
    </Center>
  );
}
