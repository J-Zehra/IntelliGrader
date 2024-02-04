/* eslint-disable react/no-array-index-key */

"use client";

import {
  Box,
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
import { Statistics, TestNavLink } from "@/utils/types";
import useTestObserver from "@/hooks/useTestObserver";
import ClassAccuracy from "./components/classAccuracy";
import HighestScore from "../overview/components/highestScore";
import LowestScore from "../overview/components/lowestScore";
import MostPickedAnswerItem from "./components/mostPickedAnswerItem";
import CommonyMistakesAnswerItem from "./components/commonMistakesAnswerItem";
import TallyOfScores from "./components/tallyOfScores";
import DownloadReport from "./components/downloadReport";
import ClassPassingRate from "./components/classPassingRate";
// import PolarAreaChart from "./components/polarAreaChart";
import PolarAreaChart from "./components/polarAreaChart";

export default function StatisticsPage() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { test_id } = useParams();
  const { ref } = useTestObserver(TestNavLink.statistics);

  const getStatistics = async () => {
    const data = { testId: test_id };
    let grade: Partial<Statistics> = {};
    await axios.get("/api/statistics", { params: data }).then((res) => {
      grade = res.data;
    });

    return grade;
  };

  const {
    data: statistics,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["grade-statistics", test_id],
    queryFn: getStatistics,
  });

  const [isDesktopLayout] = useMediaQuery("(min-width: 40em)");

  return (
    <Box pos="relative" paddingBottom="10rem" ref={ref}>
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
          <ClassPassingRate passingRate={statistics?.passingRate} />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
          <HighestScore score={statistics?.highest} />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
          <LowestScore score={statistics?.lowest} />
        </Skeleton>
      </Wrap>
      <Box paddingTop="3rem">
        <PolarAreaChart />
      </Box>
      <Box paddingBlock="3rem 1rem">
        <Text fontSize=".8rem" paddingBottom="2rem" fontWeight="medium">
          Score Distribution
        </Text>
        <TallyOfScores />
      </Box>
      <Stack
        direction={isDesktopLayout ? "row" : "column"}
        spacing={isDesktopLayout ? "1rem" : ""}
      >
        <Stack mt={10} spacing={5} flex={1}>
          {isSuccess && statistics?.questionsMostGotWrong?.length! > 0 ? (
            <Text fontSize=".8rem" fontWeight="medium">
              Common Mistakes
            </Text>
          ) : null}
          <Stack spacing={2}>
            {statistics
              ? statistics?.questionsMostGotWrong?.map((item, index) => {
                  return (
                    <CommonyMistakesAnswerItem
                      key={item.index}
                      index={index}
                      item={item}
                      numberOfChoices={item.numberOfChoices}
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
        <Stack mt={10} spacing={5} flex={1}>
          {isSuccess && statistics?.questionsMostGotRight?.length! > 0 ? (
            <Text fontSize=".8rem" fontWeight="medium">
              Questions Most Got Right
            </Text>
          ) : null}
          <Stack spacing={2}>
            {statistics
              ? statistics?.questionsMostGotRight?.map((item, index) => {
                  return (
                    <MostPickedAnswerItem
                      key={item.index}
                      item={item}
                      index={index}
                      numberOfChoices={item.numberOfChoices}
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
      </Stack>
      <Stack w="100%" paddingTop="1rem" align="end">
        <DownloadReport />
      </Stack>
    </Box>
  );
}
