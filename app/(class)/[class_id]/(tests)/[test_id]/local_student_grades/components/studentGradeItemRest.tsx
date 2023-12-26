/* eslint-disable @typescript-eslint/naming-convention */
import { AiOutlineEye } from "react-icons/ai";
import { Box, Button, Divider, Skeleton, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FetchedGradeInfo } from "@/utils/types";

export default function StudentGradeItemRest({
  grade,
}: {
  grade: FetchedGradeInfo;
}) {
  const navigate = useRouter();
  const { class_id } = useParams();

  const calculateAccuracy = () => {
    return Math.round(
      (grade.number_of_correct / grade.answer_indices.length) * 100,
    );
  };

  const getStudent = async () => {
    let studentGrade: Partial<{
      firstName: string;
      lastName: string;
      middleName: string;
    }> = {};
    await axios
      .get("/api/student", {
        params: { classId: class_id, rollNumber: grade.roll_number },
      })
      .then((res) => {
        studentGrade = res.data;
      });

    return studentGrade;
  };

  const { data: student, isLoading } = useQuery({
    queryFn: getStudent,
    queryKey: ["get-student", class_id, grade.roll_number],
  });

  return (
    <Stack
      p=".5rem"
      borderRadius=".5rem"
      bg="palette.light"
      w="100%"
      h="5.5rem"
      direction="row"
      align="center"
      justify="space-between"
      color="palette.text"
      boxShadow="2px 2px 4px rgba(0, 0, 100, .2)"
    >
      <Stack direction="row" w="100%" h="100%" spacing={2.5}>
        <Box h="100%" w="3rem" bg="palette.light" borderRadius=".4rem">
          <Image
            alt="Processed Image"
            src={`data:image/jpeg;base64, ${grade.processed_image}`}
            width={500}
            height={500}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: ".4rem",
              opacity: 0.8,
            }}
          />
        </Box>
        <Stack h="100%" justify="space-between">
          <Skeleton isLoaded={!isLoading} borderRadius=".5rem">
            <Text fontSize=".8rem" fontWeight="semibold">
              {`${student?.lastName}, ${student?.firstName}`}
            </Text>
          </Skeleton>
          <Stack direction="row" align="center" spacing={3}>
            <Button
              bg="palette.accent"
              color="palette.background"
              fontSize=".6rem"
              h="fit-content"
              maxWidth="fit-content"
              p=".6rem .7rem"
              onClick={() => navigate.push(`overview/${grade.roll_number}`)}
              leftIcon={<AiOutlineEye />}
            >
              View Details
            </Button>
            <Stack align="center" spacing={0.1}>
              <Text fontSize=".5rem" fontWeight="medi2um" opacity={0.7}>
                Accuracy
              </Text>
              <Text fontSize=".8rem" fontWeight="medium">
                {`${calculateAccuracy()}%`}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={0.1} paddingInline="1rem" align="center">
        <Text fontSize="2rem" fontWeight="bold">
          {grade.number_of_correct}
        </Text>
        <Divider mb={2} borderColor="palette.text" />
        <Text fontSize=".8rem">{grade.answer_indices.length}</Text>
      </Stack>
    </Stack>
  );
}

// data:image/jpeg;base64, ${item.processed_image}
