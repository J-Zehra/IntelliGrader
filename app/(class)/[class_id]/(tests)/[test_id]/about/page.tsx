/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Button, Skeleton, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { RiAiGenerate } from "react-icons/ri";
import { useParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FetchedTestInfo, TestNavLink } from "@/utils/types";
import moment from "moment";
import useTestObserver from "@/hooks/useTestObserver";
import Link from "next/link";
import AnswerSheet from "./components/answerSheet";
import UngradedStudents from "./components/ungradedStudents";
import MDATAnswerSheet from "./components/mdatAnswerSheet";

export default function SettingsPage() {
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

  const [isDesktopLayout] = useMediaQuery("(min-width: 40em)");

  console.log(test);

  return (
    <Stack spacing="2rem" paddingBottom="10rem" ref={ref}>
      <Text fontSize=".8rem">Test Information</Text>
      <Stack
        w="100%"
        direction={isDesktopLayout ? "row" : "column"}
        spacing={isDesktopLayout ? "5rem" : "2rem"}
      >
        <Stack spacing="2rem" flex={1}>
          <Skeleton borderRadius="1rem" isLoaded={!isLoading}>
            <Stack
              p="1.2rem"
              boxShadow="5px 5px 12px rgba(0, 0, 100, .08)"
              borderRadius="1rem"
            >
              <Stack direction="row" justify="space-between" align="center">
                <Text fontSize=".9rem">Test Name</Text>
                <Text
                  color="palette.accent"
                  fontSize=".9rem"
                  fontWeight="semibold"
                >
                  {test?.testName}
                </Text>
              </Stack>
              <Stack direction="row" justify="space-between" align="center">
                <Text fontSize=".9rem">Passing Grade (%)</Text>
                <Text
                  color="palette.accent"
                  fontSize=".9rem"
                  fontWeight="semibold"
                >
                  {test?.passingGrade}
                </Text>
              </Stack>
              <Stack direction="row" justify="space-between" align="center">
                <Text fontSize=".9rem">Total Questions</Text>
                <Text
                  color="palette.accent"
                  fontSize=".9rem"
                  fontWeight="semibold"
                >
                  {test?.answerIndices?.length}
                </Text>
              </Stack>
              <Stack direction="row" justify="space-between" align="center">
                <Text fontSize=".9rem">Format</Text>
                <Text
                  color="palette.accent"
                  fontSize=".9rem"
                  fontWeight="semibold"
                >
                  {test?.format}
                </Text>
              </Stack>

              <Stack direction="row" justify="space-between" align="center">
                <Text fontSize=".9rem">Date Created</Text>
                <Text
                  color="palette.accent"
                  fontSize=".9rem"
                  fontWeight="semibold"
                >
                  {moment(test?.createdAt).format("MMM Do YYYY")}
                </Text>
              </Stack>
            </Stack>
          </Skeleton>
          <Button
            as={Link}
            w="100%"
            bg="transparent"
            color="palette.accent"
            border="1px solid"
            borderColor="palette.accent"
            boxShadow="none"
            href="pdf"
            leftIcon={<RiAiGenerate />}
          >
            Generate Test Paper
          </Button>
        </Stack>
        <Stack flex={1} spacing="1.5rem">
          <Text fontSize=".8rem">Ungraded Students</Text>
          <UngradedStudents />
        </Stack>
      </Stack>
      <Text fontSize=".8rem">Answer Sheet</Text>
      {isLoading ? (
        <Stack spacing={2}>
          <Skeleton h="3.5rem" opacity={0.8} borderRadius=".5rem" />
          <Skeleton h="3.5rem" opacity={0.5} borderRadius=".5rem" />
          <Skeleton h="3.5rem" opacity={0.2} borderRadius=".5rem" />
        </Stack>
      ) : test?.format === "MDAT" ? (
        <MDATAnswerSheet
          testPart={test?.testParts}
          answerIndices={test?.answerIndices}
        />
      ) : (
        <AnswerSheet
          testPart={test?.testParts}
          answerIndices={test?.answerIndices}
        />
      )}
    </Stack>
  );
}
