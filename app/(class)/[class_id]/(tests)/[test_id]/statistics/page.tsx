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
import { Statistics } from "@/utils/types";
import ClassAccuracy from "../overview/components/classAccuracy";
import ClassAverage from "../overview/components/classAverage";
import HighestScore from "../overview/components/highestScore";
import LowestScore from "../overview/components/lowestScore";
import MostPickedAnswerItem from "../overview/components/mostPickedAnswerItem";
import CommonyMistakesAnswerItem from "../overview/components/commonMistakesAnswerItem";
import PolarAreaChart from "../overview/components/polarAreaChart";

export default function StatisticsPage() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { test_id } = useParams();

  const getStatistics = async () => {
    const data = { testId: test_id };
    let grade: Partial<Statistics> = {};
    await axios.get("/api/statistics", { params: data }).then((res) => {
      grade = res.data;
    });

    return grade;
  };

  const { data: statistics, isLoading } = useQuery({
    queryKey: ["grade-statistics", test_id],
    queryFn: getStatistics,
  });

  console.log(statistics);

  return (
    <Box pos="relative" paddingBottom="10rem">
      <Stack direction="row" align="center" fontSize=".8rem" spacing={1}>
        <SkeletonText isLoaded={!isLoading} noOfLines={1}>
          <Text color="palette.accent" fontWeight="semibold">
            Class
          </Text>
        </SkeletonText>
        <Text fontWeight="medium">overview for this test</Text>
      </Stack>
      <Wrap justify="center" pt={8} spacing={5}>
        <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
          <ClassAccuracy accuracy={statistics?.accuracy} />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
          <ClassAverage average={statistics?.average} />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
          <HighestScore score={statistics?.highest} />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
          <LowestScore score={statistics?.lowest} />
        </Skeleton>
      </Wrap>
      <Box paddingBlock="3rem 1rem">
        <Text fontSize=".8rem" paddingBottom="2rem" fontWeight="medium">
          Score Distribution
        </Text>
        <PolarAreaChart />
      </Box>
      <Stack mt={10} spacing={5}>
        <Text fontSize=".8rem" fontWeight="medium">
          Common Mistakes
        </Text>
        <Stack spacing={2}>
          {statistics
            ? statistics?.questionsMostGotWrong?.map((item) => {
                return (
                  <CommonyMistakesAnswerItem key={item.index} item={item} />
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
        <Stack mt={10} spacing={5}>
          <Text fontSize=".8rem" fontWeight="medium">
            Questions Most Got Right
          </Text>
          <Stack spacing={2}>
            {statistics
              ? statistics?.questionsMostGotRight?.map((item) => {
                  return <MostPickedAnswerItem key={item.index} item={item} />;
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
      </Stack>
    </Box>
  );
}
