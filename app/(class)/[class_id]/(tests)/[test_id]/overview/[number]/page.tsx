/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */

"use client";

import {
  Box,
  Button,
  Center,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  Wrap,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FetchedGradeInfo, FetchedSingleGrade } from "@/utils/types";
import { queryClient } from "@/components/wrappers/queryWrapper";
import moment from "moment";
import Accuracy from "../components/accuracy";
import Streaks from "../components/streaks";
import Correct from "../components/correct";
import Incorrect from "../components/incorrect";
import AnswerItem from "../components/answerItem";

export default function OverviewPage() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { test_id, number } = useParams();
  const toast = useToast();
  const navigate = useRouter();
  let cumulativePartIndex = -1;

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

  const deleteStudentGrade = () => {
    const data = { testId: test_id, rollNumber: number };
    return axios.delete("/api/delete_student_grade", { params: data });
  };

  const mutateRecord = useMutation({
    mutationFn: deleteStudentGrade,
    mutationKey: ["delete-record"],
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["get-student-grades", test_id], (oldData) => {
        const newData = (oldData as FetchedGradeInfo[]).filter(
          (g) => g.id !== data.id,
        );
        return newData;
      });

      toast({
        title: "Success",
        status: "success",
        duration: 3000,
      });

      navigate.back();
    },
  });

  const [isDesktopLayout] = useMediaQuery("(min-width: 40em)");

  return (
    <Center w="100%">
      <Box pos="relative" w={isDesktopLayout ? "40rem" : "100%"}>
        <Stack direction="row" align="center" fontSize=".8rem" spacing={1}>
          <SkeletonText isLoaded={!isLoading} noOfLines={1}>
            <Text color="palette.accent" fontWeight="semibold">
              {`${grade?.student?.lastName}'s`}
            </Text>
          </SkeletonText>
          <Text fontWeight="medium">performance for this test</Text>
        </Stack>
        <Text fontWeight="medium" fontSize=".8rem" paddingTop="1rem">
          {moment(grade?.createAt).calendar()}
        </Text>
        <Wrap justify="center" pt={8} spacing={5}>
          <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
            <Accuracy
              numberOfCorrect={grade?.numberOfCorrect}
              total={grade?.answerIndices?.length}
            />
          </Skeleton>
          <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
            <Streaks
              correctIndices={grade?.test?.answerIndices}
              studentIndices={grade?.answerIndices}
            />
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
          <Stack spacing={2} paddingBottom="2rem">
            {grade
              ? grade.test?.testParts.map((part, index) =>
                  [...Array(part.totalNumber)].map((_, partIndex) => {
                    cumulativePartIndex += 1;
                    return (
                      <AnswerItem
                        key={`${index}-${partIndex}`}
                        index={cumulativePartIndex}
                        questionType={part.questionType}
                        correctAnswerIndex={
                          grade.test?.answerIndices[cumulativePartIndex]
                        }
                        answerIndex={grade.answerIndices![cumulativePartIndex]}
                        numberOfChoices={part.numberOfChoices}
                      />
                    );
                  }),
                )
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
            <Box paddingTop="1rem">
              <Button
                bg="transparent"
                color="red"
                boxShadow="none"
                w="100%"
                border="1px solid red"
                isLoading={mutateRecord.isLoading}
                onClick={() => mutateRecord.mutate()}
                _hover={{ bg: "rgba(200, 0, 0, .1)" }}
              >
                Delete Record
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
