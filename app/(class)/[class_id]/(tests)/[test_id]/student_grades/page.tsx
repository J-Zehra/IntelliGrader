/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */

"use client";

import { Select, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Grade } from "@/utils/types";
import StudentGradeItemRest from "./components/studentGradeItemRest";
import StudentGradeItem from "./components/studentGradeItem";

export default function StudentGrades() {
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
  return (
    <Stack spacing={2} paddingBottom="8rem">
      <Stack direction="row" w="100%" justify="space-between" align="center">
        <Text fontSize=".8rem" fontWeight="normal">
          Total of {studentGrades?.length}{" "}
          {studentGrades && studentGrades?.length < 2 ? "paper" : "papers"}
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
    </Stack>
  );
}
