/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
import { StudentInfo } from "@/utils/types";
import { Center, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

export default function UngradedStudents() {
  const { class_id, test_id } = useParams();

  const getUngradedStudents = async () => {
    const data = { testId: test_id, classId: class_id };
    let grade: StudentInfo[] = [];
    await axios.get("/api/ungraded_students", { params: data }).then((res) => {
      grade = res.data;
    });

    return grade;
  };

  const {
    data: studentInfo,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["ungraded-students", test_id],
    queryFn: getUngradedStudents,
  });

  console.log(studentInfo);

  return (
    <Stack>
      {isLoading ? (
        <Stack spacing={2}>
          <Skeleton h="3.5rem" opacity={0.8} borderRadius=".5rem" />
          <Skeleton h="3.5rem" opacity={0.5} borderRadius=".5rem" />
          <Skeleton h="3.5rem" opacity={0.2} borderRadius=".5rem" />
        </Stack>
      ) : isSuccess && studentInfo.length < 1 ? (
        <Text fontSize=".9rem" opacity={0.5} fontWeight="medium">
          All Graded
        </Text>
      ) : (
        <Stack>
          {studentInfo?.map((student) => {
            return (
              <Stack
                key={student.rollNumber}
                direction="row"
                align="center"
                justify="space-between"
                borderRadius=".5rem"
                spacing={1}
              >
                <Center
                  p=".5rem"
                  border="1px solid"
                  borderColor="palette.light"
                  bg="rgba(0, 0, 100, .01)"
                  borderRadius=".3rem"
                  flex={1}
                >
                  <Text>{student.rollNumber}</Text>
                </Center>
                <Center
                  borderRadius=".3rem"
                  border="1px solid"
                  borderColor="palette.light"
                  bg="rgba(0, 0, 100, .01)"
                  p=".5rem 1rem"
                  justifyContent="start"
                  flex={6}
                >
                  <Text>{`${student.lastName}, ${student.firstName}`}</Text>
                </Center>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
