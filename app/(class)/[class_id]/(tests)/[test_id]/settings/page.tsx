/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Button, Skeleton, Stack, Text } from "@chakra-ui/react";
import { RiAiGenerate } from "react-icons/ri";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FetchedTestInfo } from "@/utils/types";
import moment from "moment";
import AnswerSheet from "./components/answerSheet";

export default function SettingsPage() {
  const navigate = useRouter();
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

  return (
    <Stack spacing="2rem" paddingBottom="10rem">
      <Text fontSize=".8rem">Test Information</Text>
      <Skeleton borderRadius="1rem" isLoaded={!isLoading}>
        <Stack
          p="1.2rem"
          boxShadow="2px 2px 10px rgba(0, 0, 100, .1)"
          borderRadius="1rem"
        >
          <Stack direction="row" justify="space-between" align="center">
            <Text fontSize=".9rem">Test Name</Text>
            <Text color="palette.accent" fontSize=".9rem" fontWeight="semibold">
              {test?.testName}
            </Text>
          </Stack>
          <Stack direction="row" justify="space-between" align="center">
            <Text fontSize=".9rem">Status</Text>
            <Text color="palette.accent" fontSize=".9rem" fontWeight="semibold">
              {test?.status}
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
          <Stack direction="row" justify="space-between" align="center">
            <Text fontSize=".9rem">Parts</Text>
            <Text color="palette.accent" fontSize=".9rem" fontWeight="semibold">
              {test?.testParts?.length}
            </Text>
          </Stack>
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
      <Text fontSize=".8rem">Answer Sheet</Text>
      <AnswerSheet
        testPart={test?.testParts}
        answerIndices={test?.answerIndices}
      />
    </Stack>
  );
}
