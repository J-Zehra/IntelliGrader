/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */

"use client";

import { Button, Skeleton, Stack, Text, useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { FetchedGradeInfo, Grade } from "@/utils/types";
import { localGradeInfo } from "@/state/localGradeInfo";
import Loading from "@/components/loading";
import StudentGradeItemRest from "./components/studentGradeItemRest";
import StudentGradeItem from "./components/studentGradeItem";

export default function LocalStudentGrades() {
  const { test_id, class_id } = useParams();
  const toast = useToast();
  const navigate = useRouter();
  const localGrade = useRecoilValue(localGradeInfo);

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

  console.log(studentGrades);

  return (
    <Stack spacing={2} paddingBottom="10rem">
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
            {!isLoading
              ? localGrade.map((grades: FetchedGradeInfo, index) => {
                  return index === 0 ? (
                    <StudentGradeItem grade={grades} key={grades.roll_number} />
                  ) : (
                    <StudentGradeItemRest
                      grade={grades}
                      key={grades.roll_number}
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
          <Button onClick={handleSave}>Save Records</Button>
        </>
      )}
    </Stack>
  );
}
