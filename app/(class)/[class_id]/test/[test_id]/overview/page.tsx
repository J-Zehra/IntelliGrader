/* eslint-disable react/no-array-index-key */

"use client";

import { Box, Stack, Text, Wrap } from "@chakra-ui/react";
import React from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { FetchedTestInfo } from "@/utils/types";
import { gradeState } from "@/state/gradeState";
import Accuracy from "./components/accuracy";
import Streaks from "./components/streaks";
import Correct from "./components/correct";
import Incorrect from "./components/incorrect";
import AnswerItem from "./components/answerItem";

export default function OverviewPage() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { test_id } = useParams();
  const gradeInfo = useRecoilValue(gradeState);

  const getTest = async () => {
    let test: Partial<FetchedTestInfo> = {};
    await axios.get(`/api/tests/${test_id}`).then((res) => {
      test = res.data;
    });

    return test;
  };

  const { data: testData } = useQuery({
    queryKey: ["test", test_id],
    queryFn: getTest,
  });

  return (
    <Box>
      <Stack direction="row" align="center" fontSize=".8rem" spacing={1}>
        <Text color="palette.accent" fontWeight="semibold">
          Jazen&apos;s
        </Text>
        <Text fontWeight="medium">performance for this test</Text>
      </Stack>
      <Wrap justify="center" pt={8} spacing={5}>
        <Accuracy />
        <Streaks />
        <Correct />
        <Incorrect />
      </Wrap>
      <Stack mt={10} spacing={5}>
        <Text fontSize=".8rem" fontWeight="medium">
          Answers Overview
        </Text>
        <Stack spacing={2}>
          {[...Array(gradeInfo.answerIndices.length)].map((_, index) => {
            return (
              <AnswerItem
                index={index}
                key={index}
                numberOfChoices={testData?.numberOfChoices}
              />
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
}
