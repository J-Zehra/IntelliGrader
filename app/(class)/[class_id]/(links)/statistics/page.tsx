/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import React from "react";
import { Skeleton, Stack, Text, Wrap } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AreaChart from "./components/areaChart";
import TotalPassingRate from "./components/totalPassingRate";
import TotalClassAccuracy from "./components/totalClassAccuracy";
import StudentRankings from "./components/studentRankings";

export default function StatisticsPage() {
  const { class_id } = useParams();

  const getStatistics = async () => {
    let grade: Partial<{ accuracy: number; passingRate: number }> = {};
    await axios.get(`/api/class_statistics/${class_id}`).then((res) => {
      grade = res.data;
    });

    return grade;
  };

  const { data: statistics, isLoading } = useQuery({
    queryKey: ["class-statistics", class_id],
    queryFn: getStatistics,
  });

  return (
    <Stack spacing="3rem" paddingBlock="1rem 10rem">
      <Wrap justify="center">
        <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
          <TotalPassingRate rate={statistics?.passingRate} />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
          <TotalClassAccuracy accuracy={statistics?.accuracy} />
        </Skeleton>
      </Wrap>
      <Stack spacing="1.2rem">
        <Text fontSize=".8rem">Passing Rate Distribution</Text>
        <AreaChart />
      </Stack>
      <Stack spacing="1.2rem">
        <Text fontSize=".8rem">Ranking</Text>
        <StudentRankings />
      </Stack>
    </Stack>
  );
}
