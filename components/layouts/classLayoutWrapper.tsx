/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Box, IconButton, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BottomNavbar from "@/app/(class)/[class_id]/(links)/components/bottomNavbar";
import {
  prefetchClassRanking,
  prefetchPassingRateDistribution,
  prefetchStatistics,
  prefetchStudents,
  prefetchTests,
  prefetchUngradedStudents,
} from "@/app/(class)/[class_id]/(links)/components/prefetch";
import CustomContainer from "../reusables/customContainer";

export default function ClassLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useRouter();
  const { class_id, test_id } = useParams();

  prefetchTests(class_id as string);
  prefetchStudents(class_id as string);
  prefetchStatistics(class_id as string);
  prefetchPassingRateDistribution(class_id as string);
  prefetchClassRanking(class_id as string);
  prefetchUngradedStudents(class_id as string, test_id as string);

  const getClass = async () => {
    let test: { course: string; program: string; year: number } = {
      course: "",
      program: "",
      year: 1,
    };
    await axios.get(`/api/class/name/${class_id}`).then((res) => {
      test = res.data;
    });

    return test;
  };

  const { data: classData, isLoading: isClassLoading } = useQuery({
    queryKey: ["class-name"],
    queryFn: getClass,
  });

  return (
    <CustomContainer>
      <Stack pt="5rem" w="100%" align="center" spacing="1rem" h="100vh">
        <Stack w="100%" direction="row" justify="space-between" align="center">
          <IconButton
            aria-label="Return"
            p=".5rem"
            variant="ghost"
            fontSize="1.2rem"
            color="palette.button.primary"
            cursor="pointer"
            borderRadius=".2rem"
            onClick={() => navigate.push("/")}
          >
            <BsArrowReturnLeft />
          </IconButton>
          <Stack direction="row" align="center" spacing="1.2rem">
            <Skeleton isLoaded={!isClassLoading} borderRadius=".5rem">
              <Text
                fontSize=".9rem"
                color="palette.button.primary"
                fontWeight="semibold"
                opacity=".8"
              >
                {`${classData?.course} | ${classData?.program} ${classData?.year}`}
              </Text>
            </Skeleton>
            <Box w=".5rem" h="2rem" bg="palette.accent" borderRadius="5rem" />
          </Stack>
        </Stack>
        <Box h="100%" w="100%">
          {children}
        </Box>
        <BottomNavbar />
      </Stack>
    </CustomContainer>
  );
}
