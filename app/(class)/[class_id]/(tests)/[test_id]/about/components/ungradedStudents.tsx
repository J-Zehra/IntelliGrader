/* eslint-disable @typescript-eslint/naming-convention */
import { StudentInfo } from "@/utils/types";
import { Center, Stack, Text } from "@chakra-ui/react";
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

  const { data: studentInfo } = useQuery({
    queryKey: ["ungraded-students", test_id],
    queryFn: getUngradedStudents,
  });

  console.log(studentInfo);

  return (
    <Stack>
      {studentInfo && studentInfo?.length < 1 ? (
        <Text>None</Text>
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
