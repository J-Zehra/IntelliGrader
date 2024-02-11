/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { ReactNode } from "react";
import { Box, IconButton, Skeleton, Stack, Text } from "@chakra-ui/react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next13-progressbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BottomNavbar from "@/app/(class)/[class_id]/(tests)/[test_id]/components/bottomNavbar";
import {
  prefetchStatistics,
  prefetchStudentGrades,
  prefetchUngradedStudents,
} from "@/app/(class)/[class_id]/(tests)/[test_id]/components/prefetch";
import CustomContainer from "../reusables/customContainer";

export default function TestLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useRouter();
  const path = usePathname();
  const { class_id, test_id } = useParams();

  prefetchStatistics(test_id as string);
  prefetchStudentGrades(test_id as string);
  prefetchUngradedStudents(class_id as string, test_id as string);
  // prefetchTally(test_id as string);

  const handleBackNavigation = () => {
    if (
      path.includes("overview") ||
      path.includes("student_grades/") ||
      path.includes("local_student_grades") ||
      path.includes("pdf")
    ) {
      navigate.back();
    } else {
      navigate.push(`/${class_id}/tests`);
    }
  };

  const getTest = async () => {
    let test: { testName: string } = { testName: "" };
    await axios.get(`/api/tests/name/${test_id}`).then((res) => {
      test = res.data;
    });

    return test;
  };

  const { data: testData, isLoading: isTestLoading } = useQuery({
    queryKey: ["test-name"],
    queryFn: getTest,
  });

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
            onClick={handleBackNavigation}
          >
            <BsArrowReturnLeft />
          </IconButton>
          <Stack direction="row" spacing="1.2rem" align="center">
            <Stack spacing={0.1} align="end">
              <Skeleton isLoaded={!isTestLoading} borderRadius=".5rem">
                <Text
                  fontSize=".9rem"
                  color="palette.button.primary"
                  fontWeight="semibold"
                  opacity=".8"
                >
                  {testData?.testName}
                </Text>
              </Skeleton>
              <Skeleton isLoaded={!isClassLoading} borderRadius=".5rem">
                <Text
                  fontSize=".7rem"
                  color="palette.button.primary"
                  fontWeight="semibold"
                  opacity=".8"
                >
                  {`${classData?.course} | ${classData?.program} ${classData?.year}`}
                </Text>
              </Skeleton>
            </Stack>
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
