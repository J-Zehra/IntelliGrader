/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Divider, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IoMdAdd } from "react-icons/io";

type ClassOverview = {
  course: string;
  totalStudents: number;
  totalTests: number;
  totalTestsCompleted: number;
};

export default function OverviewCard() {
  const { class_id } = useParams();

  const { data, isLoading } = useQuery<ClassOverview>({
    queryKey: ["class"],
    queryFn: async () => {
      const res = await fetch(`/api/class/${class_id}`, {
        method: "GET",
      });
      const classes = res.json();

      return classes;
    },
  });

  return (
    <Skeleton isLoaded={!isLoading} borderRadius="1.5rem">
      <Stack
        boxShadow="2px 4px 10px rgba(0, 0, 100, .2)"
        p="1.2rem"
        borderRadius="1.5rem"
      >
        <Stack
          direction="row"
          paddingBottom="1rem"
          align="center"
          justify="space-around"
        >
          <Stack align="center" spacing={0}>
            <Text fontSize="3rem" color="palette.accent" fontWeight="bold">
              {data?.totalStudents}
            </Text>
            <Text fontSize=".9rem" color="palette.text">
              Students
            </Text>
          </Stack>
          <Divider
            borderColor="palette.light"
            orientation="vertical"
            h="5rem"
          />
          <Stack align="center" spacing={0}>
            <Text
              fontSize="1.8rem"
              fontWeight="bold"
              color="palette.button.primary"
            >
              {data?.totalTests}
            </Text>
            <Text fontSize=".8rem" color="palette.text">
              Tests
            </Text>
          </Stack>
          <Stack align="center" spacing={0}>
            <Text
              fontSize="1.8rem"
              fontWeight="bold"
              color="palette.button.primary"
            >
              {data?.totalTestsCompleted || 0}
            </Text>
            <Text fontSize=".8rem" color="palette.text">
              Tests Completed
            </Text>
          </Stack>
        </Stack>
        <Divider borderColor="palette.light" />
        <Stack paddingTop="1rem" spacing={3} direction="row">
          <Button
            bg="transparent"
            color="palette.accent"
            border="1px solid"
            boxShadow="none"
            borderColor="palette.accent"
            w="100%"
            leftIcon={<IoMdAdd />}
          >
            Add Student
          </Button>
          <Link href="setup_test">
            <Button w="100%" leftIcon={<IoMdAdd />}>
              Setup Test
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Skeleton>
  );
}
