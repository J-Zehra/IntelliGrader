/* eslint-disable @typescript-eslint/naming-convention */
import { AiOutlineEye } from "react-icons/ai";
import { Button, Divider, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Grade } from "@/utils/types";
import moment from "moment";

export default function StudentGradeItem({ grade }: { grade: Grade }) {
  const navigate = useRouter();

  return (
    <Stack
      p=".5rem 1rem"
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
        <Stack h="100%" justify="space-between" color="palette.button.primary">
          <Text fontSize=".8rem" fontWeight="semibold">
            {`${grade.student.lastName}, ${
              grade.student.firstName
            } ${grade.student.middleName.charAt(0)}.`}
          </Text>
          <Stack direction="row" align="center" spacing={3}>
            <Button
              bg="tranparent"
              boxShadow="none"
              color="palette.accent"
              fontSize=".6rem"
              border="1px solid"
              borderColor="palette.accent"
              h="fit-content"
              maxWidth="fit-content"
              p=".6rem .7rem"
              onClick={() =>
                navigate.push(
                  `${grade.test.id}/overview/${grade.student.rollNumber}`,
                )
              }
              leftIcon={<AiOutlineEye />}
            >
              View Details
            </Button>
            <Stack align="center" spacing={0.1} color="palette.button.primary">
              <Text fontSize=".65rem" fontWeight="medium" opacity={0.7}>
                {moment(grade.createdAt).calendar()}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        spacing={0.1}
        paddingInline="1rem"
        color="palette.button.primary"
        align="center"
      >
        <Text fontSize="2rem" fontWeight="bold">
          {grade.totalScore}
        </Text>
        <Divider mb={2} borderColor="palette.text" />
        <Text fontSize=".8rem">{grade.totalPerfectScore}</Text>
      </Stack>
    </Stack>
  );
}
