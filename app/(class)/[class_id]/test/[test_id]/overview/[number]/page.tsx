/* eslint-disable react/no-array-index-key */

"use client";

import {
  Box,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FetchedSingleGrade } from "@/utils/types";
import Accuracy from "../components/accuracy";
import Streaks from "../components/streaks";
import Correct from "../components/correct";
import Incorrect from "../components/incorrect";
import AnswerItem from "../components/answerItem";

export default function OverviewPage() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { test_id, number } = useParams();

  const getGrade = async () => {
    const data = { testId: test_id, rollNumber: number };
    // const encodedData = encodeURIComponent(JSON.stringify(data));
    let grade: Partial<FetchedSingleGrade> = {};
    await axios.get("/api/student_grade", { params: data }).then((res) => {
      grade = res.data;
    });

    return grade;
  };

  const { data: grade, isLoading } = useQuery({
    queryKey: ["individual-grade", number, test_id],
    queryFn: getGrade,
  });

  console.log(grade);

  return (
    <Box>
      <Stack direction="row" align="center" fontSize=".8rem" spacing={1}>
        <SkeletonText isLoaded={!isLoading} noOfLines={1}>
          <Text color="palette.accent" fontWeight="semibold">
            {`${grade?.student?.lastName}'s`}
          </Text>
        </SkeletonText>
        <Text fontWeight="medium">performance for this test</Text>
      </Stack>
      <Wrap justify="center" pt={8} spacing={5}>
        <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
          <Accuracy
            numberOfCorrect={grade?.numberOfCorrect}
            total={grade?.answerIndices?.length}
          />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
          <Streaks />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
          <Correct correct={grade?.numberOfCorrect} />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
          <Incorrect incorrect={grade?.numberOfIncorrect} />
        </Skeleton>
      </Wrap>
      <Stack mt={10} spacing={5}>
        <Text fontSize=".8rem" fontWeight="medium">
          Answers Overview
        </Text>
        <Stack spacing={2}>
          {grade
            ? [...Array(grade.answerIndices?.length)].map((_, index) => {
                return (
                  <AnswerItem
                    index={index}
                    key={index}
                    correctAnswerIndex={grade.test?.answerIndices[index]}
                    answerIndex={grade.answerIndices![index]}
                    numberOfChoices={grade.test?.numberOfChoices}
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
                    h="4rem"
                  />
                );
              })}
        </Stack>
      </Stack>
    </Box>
  );
}
