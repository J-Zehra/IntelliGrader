/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */

"use client";

import {
  Center,
  Image,
  Select,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { gradeState } from "@/state/gradeState";
import { Grade } from "@/utils/types";
import StudentGradeItem from "./components/studentGradeItem";

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

  const { data: studentGrades } = useQuery({
    queryFn: getStudentGrades,
    queryKey: ["get-student-grades", test_id],
  });

  console.log(studentGrades);

  const gradesInfo = useRecoilValue(gradeState);
  return (
    <Stack spacing={2} paddingBottom={5}>
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
      <Stack marginTop={10}>
        {studentGrades?.map((grades: Grade) => {
          return <StudentGradeItem grade={grades} key={grades.rollNumber} />;
        })}
      </Stack>
      <Center p="1rem" bg="palette.light">
        <Wrap
          bg="palette.light"
          padding="1rem"
          justify="start"
          align="center"
          w="100%"
          pos="relative"
          borderRadius=".5rem"
        >
          {gradesInfo.map((file) => {
            return (
              <WrapItem
                key={file.processedImage}
                w={
                  gradesInfo.length === 1
                    ? "100%"
                    : gradesInfo.length === 2
                    ? "48%"
                    : gradesInfo.length === 3
                    ? "30%"
                    : "23%"
                }
              >
                <Image
                  borderRadius=".5rem"
                  src={file.processedImage}
                  w="100%"
                />
              </WrapItem>
            );
          })}
        </Wrap>
      </Center>
    </Stack>
  );
}
