/* eslint-disable @typescript-eslint/naming-convention */
import { AiOutlineEye } from "react-icons/ai";
import { Button, Divider, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next13-progressbar";
import { Grade } from "@/utils/types";

export default function StudentGradeItem({ grade }: { grade: Grade }) {
  const navigate = useRouter();

  const calculateAccuracy = () => {
    return Math.round(
      (grade.numberOfCorrect / grade.answerIndices.length) * 100,
    );
  };

  return (
    <Stack
      p=".5rem 1rem"
      borderRadius=".5rem"
      bg="palette.accent"
      w="100%"
      h="5.5rem"
      direction="row"
      align="center"
      justify="space-between"
      color="palette.background"
    >
      <Stack direction="row" w="100%" h="100%" spacing={2.5}>
        <Stack h="100%" justify="space-between">
          <Text fontSize=".8rem" fontWeight="semibold">
            {`${grade.student.lastName}, ${
              grade.student.firstName
            } ${grade.student.middleName.charAt(0)}.`}
          </Text>
          <Stack direction="row" align="center" spacing={3}>
            <Button
              bg="palette.background"
              color="palette.accent"
              fontSize=".6rem"
              h="fit-content"
              maxWidth="fit-content"
              p=".6rem .7rem"
              onClick={() =>
                navigate.push(`overview/${grade.student.rollNumber}`)
              }
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
          {grade.totalScore}
        </Text>
        <Divider mb={2} />
        <Text fontSize=".8rem">{grade.totalPerfectScore}</Text>
      </Stack>
    </Stack>
  );
}
