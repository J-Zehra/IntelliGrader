/* eslint-disable @typescript-eslint/naming-convention */
import { useParams } from "next/navigation";
import axios from "axios";
import { Grade } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { Box, Skeleton, Stack, Text } from "@chakra-ui/react";
import StudentGradeItem from "./studentGrade";

export default function RecentScans() {
  const { class_id } = useParams();

  const getStudentGrades = async () => {
    const id = class_id;
    let studentGrade: Grade[] = [];
    await axios.get(`/api/recent_scans/${id}`).then((res) => {
      studentGrade = res.data;
    });

    return studentGrade;
  };

  const {
    data: studentGrades,
    isLoading,
    isSuccess,
  } = useQuery({
    queryFn: getStudentGrades,
    queryKey: ["get-recent-scans", class_id],
  });

  console.log(studentGrades);

  return (
    <Skeleton isLoaded={!isLoading} borderRadius="1rem" paddingBottom="2rem">
      <Stack w="100%">
        <Text
          fontSize=".9rem"
          marginBottom=".5rem"
          fontWeight="medium"
          opacity={0.8}
        >
          Recent Scans
        </Text>
        {isSuccess && studentGrades.length < 1 ? (
          <Stack
            marginTop="1rem"
            spacing="1.2rem"
            align="center"
            justify="center"
          >
            <Box
              w="6rem"
              h="6rem"
              borderRadius=".5rem"
              border="2px dashed rgba(0, 0, 200, .4)"
            />
            <Text
              color="palette.button.primary"
              fontWeight="medium"
              opacity={0.6}
            >
              No recent scans
            </Text>
          </Stack>
        ) : null}
        {studentGrades?.map((grade) => {
          return <StudentGradeItem grade={grade} />;
        })}
      </Stack>
    </Skeleton>
  );
}
