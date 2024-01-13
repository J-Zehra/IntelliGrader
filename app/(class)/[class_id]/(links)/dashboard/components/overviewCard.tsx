/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Divider, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";

type ClassOverview = {
  course: string;
  totalStudents: number;
  totalTests: number;
  totalTestsCompleted: number;
};

export default function OverviewCard() {
  const { class_id } = useParams();
  const navigate = useRouter();

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
        boxShadow="5px 5px 10px rgba(0, 0, 100, .08)"
        p="1.2rem"
        w="100%"
        borderRadius="1.5rem"
      >
        <Stack
          direction="row"
          paddingBottom="1rem"
          align="center"
          justify="space-around"
        >
          <Stack align="center" spacing={0}>
            <Text fontSize="4rem" color="palette.accent" fontWeight="bold">
              {data?.totalStudents || 0}
            </Text>
            <Text fontSize=".9rem" color="palette.accent">
              Tests
            </Text>
          </Stack>
          <Divider
            borderColor="palette.light"
            orientation="vertical"
            h="5rem"
            pos="absolute"
          />
          <Stack align="center" spacing={0}>
            <Text
              fontSize="2rem"
              fontWeight="bold"
              color="palette.button.primary"
            >
              {data?.totalTests || 0}
            </Text>
            <Text fontSize=".8rem" color="palette.text">
              Students
            </Text>
          </Stack>
        </Stack>
        <Divider borderColor="palette.light" />
        <Stack paddingTop="1rem" spacing={2} direction="row">
          <Button
            bg="transparent"
            color="palette.accent"
            border="1px solid"
            boxShadow="none"
            borderColor="palette.accent"
            w="100%"
            fontSize=".9rem"
            onClick={() => navigate.push("students")}
            leftIcon={<IoMdAdd />}
          >
            Student
          </Button>
          <Link href="setup_test">
            <Button w="100%" leftIcon={<IoMdAdd />} fontSize=".9rem">
              Setup Test
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Skeleton>
  );
}
