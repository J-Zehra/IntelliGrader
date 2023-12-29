/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */

"use client";

import { Button, Stack, Text, useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { FetchedGradeInfo } from "@/utils/types";
import { localGradeInfo } from "@/state/localGradeInfo";
import Loading from "@/components/loading";
import StudentGradeItemRest from "./components/studentGradeItemRest";
import StudentGradeItem from "./components/studentGradeItem";

export default function LocalStudentGrades() {
  const { test_id, class_id } = useParams();
  const toast = useToast();
  const navigate = useRouter();
  const localGrade = useRecoilValue(localGradeInfo);

  const createStudentGrade = (grades: FetchedGradeInfo[]) => {
    const data = { testId: test_id, grades, classId: class_id };
    return axios.post("/api/create_student_grade", data);
  };

  const mutateStudentGrade = useMutation({
    mutationFn: createStudentGrade,
    mutationKey: ["create-student-grade", test_id],
    onSuccess: () => {
      toast({
        title: "Successly saved",
        status: "success",
        duration: 3000,
      });
      navigate.push("student_grades");
    },
  });

  const handleSave = () => {
    mutateStudentGrade.mutate(localGrade);
  };

  return (
    <Stack spacing={2} paddingBottom="2rem">
      {mutateStudentGrade.isLoading ? (
        <Loading message="Saving..." />
      ) : (
        <>
          <Stack
            direction="row"
            w="100%"
            justify="space-between"
            align="center"
          >
            <Text fontSize=".8rem" fontWeight="normal">
              Total of {localGrade.length}
              {localGrade.length < 2 ? " paper" : " papers"}
            </Text>
          </Stack>
          <Stack marginTop={10} spacing={3}>
            {localGrade.map((grades: FetchedGradeInfo, index) => {
              return index === 0 ? (
                <StudentGradeItem grade={grades} key={grades.roll_number} />
              ) : (
                <StudentGradeItemRest grade={grades} key={grades.roll_number} />
              );
            })}
          </Stack>
          <Button onClick={handleSave}>Save Records</Button>
        </>
      )}
    </Stack>
  );
}
