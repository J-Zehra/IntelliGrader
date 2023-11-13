/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */

"use client";

import { Center, Select, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BsFillBarChartFill } from "react-icons/bs";
import Link from "next/link";
import { gradeState } from "@/state/gradeState";
import { Grade } from "@/utils/types";
import StudentGradeItem from "./components/studentGradeItem";
import StudentGradeItemRest from "./components/studentGradeItemRest";

export default function GradePage() {
  const { test_id } = useParams();

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

  console.log(studentGrades);

  const gradesInfo = useRecoilValue(gradeState);
  return (
    <Stack spacing={2} paddingBottom="8rem">
      <Stack direction="row" w="100%" justify="space-between" align="center">
        <Text fontSize=".8rem" fontWeight="normal">
          Total of {gradesInfo.length} paper
        </Text>
        <Select placeholder="Sort" w="6rem" fontSize=".8rem" colorScheme="red">
          <option value="option1" style={{ fontSize: ".8rem" }}>
            Highest
          </option>
          <option value="option2">Lowest</option>
        </Select>
      </Stack>
      <Stack marginTop={10} spacing={3}>
        {!isLoading
          ? studentGrades?.map((grades: Grade, index) => {
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
      <Link href="overview/statistics">
        <Center
          pos="fixed"
          bottom="1.5rem"
          right="1.5rem"
          p="1.2rem"
          bg="palette.accent"
          color="palette.background"
          zIndex={10}
          borderRadius="10rem"
        >
          <BsFillBarChartFill fontSize="2rem" />
        </Center>
      </Link>
    </Stack>
  );
}
