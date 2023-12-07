/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { ReactNode } from "react";
import { Box, IconButton, Stack, Text } from "@chakra-ui/react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useParams, useRouter } from "next/navigation";
import BottomNavbar from "@/app/(class)/[class_id]/(tests)/[test_id]/components/bottomNavbar";
import {
  prefetchStatistics,
  prefetchStudentGrades,
} from "@/app/(class)/[class_id]/(tests)/[test_id]/components/prefetch";
import CustomContainer from "../reusables/customContainer";

export default function TestLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useRouter();
  const { class_id, test_id } = useParams();

  prefetchStatistics(test_id as string);
  prefetchStudentGrades(test_id as string);

  return (
    <CustomContainer>
      <Stack pt="6.5rem" w="100%" align="center" spacing="1rem" h="100vh">
        <Stack w="100%" direction="row" justify="space-between" align="center">
          <IconButton
            aria-label="Return"
            p=".5rem"
            variant="ghost"
            fontSize="1.2rem"
            color="palette.button.primary"
            cursor="pointer"
            borderRadius=".2rem"
            onClick={() => navigate.push(`/${class_id}/tests`)}
          >
            <BsArrowReturnLeft />
          </IconButton>
          <Stack direction="row" align="center">
            <Text
              fontSize=".9rem"
              color="palette.button.primary"
              fontWeight="semibold"
              opacity=".8"
            >
              Title
            </Text>
            <Box w=".5rem" h=".5rem" bg="palette.accent" borderRadius="5rem" />
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
