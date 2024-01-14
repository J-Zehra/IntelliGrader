/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */

"use client";

import {
  Button,
  Center,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { FetchedGradeInfo } from "@/utils/types";
import { localGradeInfo } from "@/state/localGradeInfo";
import Loading from "@/components/loading";
import { failedToScan } from "@/state/failedToScan";
import Image from "next/image";
import StudentGradeItemRest from "./components/studentGradeItemRest";
import StudentGradeItem from "./components/studentGradeItem";

export default function LocalStudentGrades() {
  const { test_id, class_id } = useParams();
  const toast = useToast();
  const navigate = useRouter();
  const localGrade = useRecoilValue(localGradeInfo);
  const failedScan = useRecoilValue(failedToScan);

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

  const [isDesktopLayout] = useMediaQuery("(min-width: 40em)");

  return (
    <Center w="100%">
      <Stack
        spacing={2}
        paddingBottom="2rem"
        w={isDesktopLayout ? "40rem" : "100%"}
      >
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
                  <StudentGradeItemRest
                    grade={grades}
                    key={grades.roll_number}
                  />
                );
              })}
            </Stack>
            <Button onClick={handleSave}>Save Student Records</Button>
            <Stack paddingTop="2rem">
              <Text fontSize=".8rem" fontWeight="normal">
                Failed To Scan
              </Text>
              <Wrap justify="start" gap="1rem">
                {failedScan.map((item: { status: string; image: string }) => {
                  return (
                    <WrapItem>
                      <Image
                        src={item.image}
                        width={600}
                        height={600}
                        alt="Failed Scan Image"
                        style={{ width: "5rem", borderRadius: "1rem" }}
                      />
                    </WrapItem>
                  );
                })}
              </Wrap>
            </Stack>
          </>
        )}
      </Stack>
    </Center>
  );
}
