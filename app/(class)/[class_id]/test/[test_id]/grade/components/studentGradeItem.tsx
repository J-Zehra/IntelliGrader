/* eslint-disable @typescript-eslint/naming-convention */
import { AiOutlineEye } from "react-icons/ai";
import { Box, Button, Divider, Stack, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { gradeState } from "@/state/gradeState";

export default function StudentGradeItem() {
  const gradeInfo = useRecoilValue(gradeState);
  const { class_id, test_id } = useParams();
  const navigate = useRouter();

  const calculateAccuracy = () => {
    return (
      (gradeInfo.totalNumberOfCorrect / gradeInfo.answerIndices.length) * 100
    );
  };
  return (
    <Stack
      p=".5rem"
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
        <Box h="100%" w="3rem" bg="palette.light" borderRadius=".4rem">
          <Image
            alt="Processed Image"
            src={gradeInfo.processedImage}
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
          <Text fontSize=".8rem" fontWeight="semibold">
            Jazen Adrian Maraña
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
                navigate.push(`/${class_id}/test/${test_id}/overview`)
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
          {gradeInfo.totalNumberOfCorrect}
        </Text>
        <Divider mb={2} />
        <Text fontSize=".8rem">{gradeInfo.answerIndices.length}</Text>
      </Stack>
    </Stack>
  );
}
