"use client";

/* eslint-disable @typescript-eslint/naming-convention */

import {
  Center,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  Wrap,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Grade } from "@/utils/types";
import TotalPassingRate from "../../components/totalPassingRate";
import TotalClassAccuracy from "../../components/totalClassAccuracy";
import StudentGradeItem from "../../components/studentGrade";

export default function StudentScores() {
  const { class_id, id } = useParams();

  const getClassRanking = async () => {
    let grade: Partial<{
      grade: Grade[];
      passingRate: number;
      accuracy: number;
    }> = {};
    await axios
      .get("/api/student_performance", {
        params: { classId: class_id, studentId: id },
      })
      .then((res) => {
        grade = res.data;
      });

    return grade;
  };

  const { data: studentGrades, isLoading } = useQuery({
    queryKey: ["student-performance", class_id, id],
    queryFn: getClassRanking,
  });

  const [isDesktopLayout] = useMediaQuery("(min-width: 40em)");
  return (
    <Center w="100%">
      <Stack
        spacing="2rem"
        paddingBlock={isDesktopLayout ? "1rem" : "1rem 10rem"}
        direction={{ base: "column", sm: "row" }}
        w="100%"
      >
        <Stack direction="row" align="center" fontSize=".8rem" spacing={1}>
          <SkeletonText isLoaded={!isLoading} borderRadius="1rem" noOfLines={1}>
            <Text color="palette.accent" fontWeight="semibold">
              {`${studentGrades?.grade![0].student
                .firstName} ${studentGrades?.grade![0].student.lastName!}'s`}
            </Text>
          </SkeletonText>
          <Text fontWeight="medium">performance for this class</Text>
        </Stack>
        <Stack flex={1} spacing="3rem">
          <Wrap justify="center">
            <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
              <TotalPassingRate rate={studentGrades?.passingRate} />
            </Skeleton>
            <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
              <TotalClassAccuracy accuracy={studentGrades?.accuracy} />
            </Skeleton>
          </Wrap>
        </Stack>
        <Stack spacing="1.2rem">
          <Text fontSize=".8rem" fontWeight="medium">
            Tests Taken
          </Text>
          {!isLoading ? (
            <Stack>
              {studentGrades?.grade?.map((grade) => {
                return <StudentGradeItem grade={grade} />;
              })}
            </Stack>
          ) : (
            <Stack spacing={3}>
              <Skeleton h="4rem" opacity={0.6} borderRadius=".5rem" />
              <Skeleton h="4rem" opacity={0.4} borderRadius=".5rem" />
              <Skeleton h="4rem" opacity={0.2} borderRadius=".5rem" />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Center>
  );
}
