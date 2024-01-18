/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { AiOutlineEye } from "react-icons/ai";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FetchedGradeInfo } from "@/utils/types";
import { useEffect, useState } from "react";
import { FaInfo } from "react-icons/fa6";
import ErrorModal from "./errorModal";
import ImageModal from "./imageModal";
import { createURL } from "../../components/createUrl";

export default function StudentGradeItem({
  grade,
}: {
  grade: FetchedGradeInfo;
}) {
  const { class_id } = useParams();
  const [doesNotExist, setDoesNotExist] = useState<boolean>(false);

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

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isImageOpen,
    onClose: onImageClose,
    onOpen: onImageOpen,
  } = useDisclosure();
  useEffect(() => {
    if (!isLoading && !student?.lastName) {
      setDoesNotExist(true);
    }
  }, [isLoading, onOpen, student?.lastName]);

  return (
    <>
      {isOpen ? (
        <ErrorModal
          isOpen={isOpen}
          onClose={onClose}
          rollNumber={grade.roll_number}
        />
      ) : null}
      {isImageOpen ? (
        <ImageModal
          image={createURL(grade.processed_image)}
          isOpen={isImageOpen}
          onClose={onImageClose}
        />
      ) : null}
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
        pos="relative"
        opacity={doesNotExist ? 0.8 : 1}
        border={doesNotExist ? "2px solid red" : ""}
      >
        <Stack direction="row" w="100%" h="100%" spacing={2.5}>
          <Box
            h="100%"
            w="3rem"
            bg="palette.light"
            onClick={onImageOpen}
            borderRadius=".4rem"
          >
            <Image
              alt="Processed Image"
              src={createURL(grade.processed_image)}
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
              {doesNotExist ? (
                <IconButton
                  aria-label="Error button"
                  bg="red.500"
                  minW="0"
                  h="0"
                  p="1rem"
                  onClick={onOpen}
                  fontSize="1rem"
                  icon={<FaInfo />}
                />
              ) : (
                <Text fontSize=".8rem" fontWeight="semibold">
                  {student?.lastName}, {student?.firstName}
                </Text>
              )}
            </Skeleton>
            <Stack direction="row" align="center" spacing={3}>
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
            {grade.total_score}
          </Text>
          <Divider mb={2} />
          <Text fontSize=".8rem">{grade.total_perfect_score}</Text>
        </Stack>
      </Stack>
      {/* <Image
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
      /> */}
    </>
  );
}

// data:image/jpeg;base64, ${item.processed_image}
