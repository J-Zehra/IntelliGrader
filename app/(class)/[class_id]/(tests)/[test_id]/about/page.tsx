/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Button, Skeleton, Stack, Text } from "@chakra-ui/react";
import { RiAiGenerate } from "react-icons/ri";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FetchedTestInfo, TestNavLink } from "@/utils/types";
import moment from "moment";
import useTestObserver from "@/hooks/useTestObserver";
import AnswerSheet from "./components/answerSheet";
import UngradedStudents from "./components/ungradedStudents";

export default function SettingsPage() {
  const navigate = useRouter();
  const { ref } = useTestObserver(TestNavLink.settings);
  const { test_id } = useParams();

  const getTest = async () => {
    let grade: Partial<FetchedTestInfo> = {};
    await axios.get(`/api/tests/${test_id}`).then((res) => {
      grade = res.data;
    });

    return grade;
  };

  const { data: test, isLoading } = useQuery({
    queryKey: ["test-info", test_id],
    queryFn: getTest,
  });

  const handleGenerate = () => {
    navigate.push("pdf");
  };

  console.log(test);

  return (
    <Stack spacing="2rem" paddingBottom="10rem" ref={ref}>
      <Text fontSize=".8rem">Test Information</Text>
      <Skeleton borderRadius="1rem" isLoaded={!isLoading}>
        <Stack
          p="1.2rem"
          boxShadow="5px 5px 12px rgba(0, 0, 100, .08)"
          borderRadius="1rem"
        >
          <Stack direction="row" justify="space-between" align="center">
            <Text fontSize=".9rem">Test Name</Text>
            <Text color="palette.accent" fontSize=".9rem" fontWeight="semibold">
              {test?.testName}
            </Text>
          </Stack>
          <Stack direction="row" justify="space-between" align="center">
            <Text fontSize=".9rem">Passing Grade (%)</Text>
            <Text color="palette.accent" fontSize=".9rem" fontWeight="semibold">
              {test?.passingGrade}
            </Text>
          </Stack>
          <Stack direction="row" justify="space-between" align="center">
            <Text fontSize=".9rem">Total Questions</Text>
            <Text color="palette.accent" fontSize=".9rem" fontWeight="semibold">
              {test?.answerIndices?.length}
            </Text>
          </Stack>
          {test?.testParts?.map((part, index) => {
            return (
              <Stack direction="row" justify="space-between" align="center">
                <Text fontSize=".9rem">Part {index + 1}</Text>
                <Text
                  color="palette.accent"
                  fontSize=".9rem"
                  fontWeight="semibold"
                >
                  {part.totalNumber * part.points}
                </Text>
              </Stack>
            );
          })}
          <Stack direction="row" justify="space-between" align="center">
            <Text fontSize=".9rem">Date Created</Text>
            <Text color="palette.accent" fontSize=".9rem" fontWeight="semibold">
              {moment(test?.createdAt).format("MMM Do YYYY")}
            </Text>
          </Stack>
        </Stack>
      </Skeleton>
      <Button
        w="100%"
        bg="transparent"
        color="palette.accent"
        border="1px solid"
        borderColor="palette.accent"
        boxShadow="none"
        onClick={handleGenerate}
        leftIcon={<RiAiGenerate />}
      >
        Generate Test Paper
      </Button>
      <Stack spacing="1.5rem">
        <Text fontSize=".8rem">Ungraded Students</Text>
        <UngradedStudents />
      </Stack>
      <Text fontSize=".8rem">Answer Sheet</Text>
      <AnswerSheet
        testPart={test?.testParts}
        answerIndices={test?.answerIndices}
      />
    </Stack>
  );
}
