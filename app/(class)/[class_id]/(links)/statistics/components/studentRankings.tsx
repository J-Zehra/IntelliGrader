/* eslint-disable @typescript-eslint/naming-convention */
import { Center, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";

export default function StudentRankings() {
  const { class_id } = useParams();

  const getClassRanking = async () => {
    let grade: Partial<
      { accuracy: number; studentName: string; id: string }[]
    > = [];
    await axios.get(`/api/ranking/${class_id}`).then((res) => {
      grade = res.data;
    });

    return grade;
  };

  const { data: students, isLoading } = useQuery({
    queryKey: ["class-ranking", class_id],
    queryFn: getClassRanking,
  });

  return (
    <Stack>
      {!isLoading ? (
        students?.map((student, index) => {
          return (
            <Stack
              key={student?.id}
              direction="row"
              boxShadow="1px 1px 5px rgba(0, 0, 100, .05)"
              borderRadius=".5rem"
            >
              <Center
                flex={1}
                bg="palette.button.secondary"
                p="1rem"
                borderLeftRadius=".6rem"
              >
                <Text
                  color="palette.button.primary"
                  fontWeight="bold"
                  fontSize="1.2rem"
                >
                  {index + 1}
                </Text>
              </Center>
              <Center flex={10} paddingInline=".5rem" justifyContent="start">
                <Text fontSize=".85rem">{student?.studentName}</Text>
              </Center>
              <Center flex={4} borderRightRadius=".6rem" bg="palette.accent">
                <Text
                  color="palette.background"
                  fontWeight="bold"
                  fontSize="1.2rem"
                >
                  {student?.accuracy}%
                </Text>
              </Center>
            </Stack>
          );
        })
      ) : (
        <Stack spacing={3}>
          <Skeleton h="4rem" opacity={0.6} borderRadius=".5rem" />
          <Skeleton h="4rem" opacity={0.4} borderRadius=".5rem" />
          <Skeleton h="4rem" opacity={0.2} borderRadius=".5rem" />
        </Stack>
      )}
    </Stack>
  );
}
