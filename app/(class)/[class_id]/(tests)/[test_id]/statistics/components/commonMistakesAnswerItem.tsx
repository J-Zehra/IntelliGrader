/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import {
  Box,
  Center,
  Collapse,
  Radio,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FetchedStudentInfo,
  QuestionType,
  QuestionsMostGotWrong,
} from "@/utils/types";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function convertToLetter(index: number) {
  return String.fromCharCode("A".charCodeAt(0) + index);
}

function convertToTorF(index: number) {
  if (index === 0) return "True";
  return "False";
}

export default function CommonyMistakesAnswerItem({
  item,
  index,
  numberOfChoices,
}: {
  item: QuestionsMostGotWrong;
  numberOfChoices: number;
  index: number;
}) {
  const { isOpen, onToggle } = useDisclosure();
  const { class_id } = useParams();

  const getStudents = async () => {
    let data: FetchedStudentInfo[] = [];
    await axios.get(`/api/students/${class_id}`).then((res) => {
      data = res.data;
    });

    return data;
  };

  const { data: studentInfo } = useQuery({
    queryKey: ["students", class_id],
    queryFn: getStudents,
  });

  return (
    <>
      {index === 0 ? (
        <>
          <Collapse in={isOpen} animateOpacity>
            <Stack bg="palette.light" borderRadius=".5rem" p="1rem">
              <Text
                fontSize=".9rem"
                color="palette.button.primary"
                fontWeight="semibold"
              >{`${item.studentCount} out of ${studentInfo?.length} ${
                item.studentCount > 1 ? "students" : "student"
              } got these questions wrong.`}</Text>
              <Stack paddingTop="1rem">
                {item.studentNames.map((student) => {
                  return (
                    <Text fontSize=".9rem" key={student}>
                      {student}
                    </Text>
                  );
                })}
              </Stack>
            </Stack>
          </Collapse>
          <Center
            onClick={onToggle}
            color="palette.button.primary"
            fontSize="1.5rem"
            transform={!isOpen ? "rotate(180deg)" : ""}
          >
            <MdOutlineArrowDropDown />
          </Center>
        </>
      ) : null}
      <Stack bg="palette.light" borderRadius=".5rem" direction="row">
        <Center
          flex={1}
          bg="palette.button.secondary"
          p="1rem"
          borderLeftRadius=".5rem"
        >
          <Text
            color="palette.button.primary"
            fontWeight="bold"
            fontSize="1.2rem"
          >
            {item.index + 1}
          </Text>
        </Center>
        <Box flex={10}>
          <Wrap
            direction="row"
            h="100%"
            w="100%"
            padding="1rem"
            align="center"
            spacing="1rem"
            justify="start"
          >
            {[...Array(numberOfChoices)].map((_, index2) => {
              return (
                <WrapItem>
                  <Radio
                    opacity={0.8}
                    isChecked={item.correctAnswer === index2}
                    colorScheme={item.correctAnswer === index2 ? "red" : ""}
                    key={index2}
                    isReadOnly
                    borderColor="rgba(0, 0, 0, .6)"
                  >
                    <Text
                      fontSize=".9rem"
                      opacity={0.6}
                      fontWeight={
                        item.correctAnswer === index2 ? "bold" : "semibold"
                      }
                      color={item.correctAnswer === index2 ? "red" : ""}
                    >
                      {item.questionType === QuestionType.trueOrFalse
                        ? convertToTorF(index2)
                        : convertToLetter(index2)}
                    </Text>
                  </Radio>
                </WrapItem>
              );
            })}
          </Wrap>
        </Box>
      </Stack>
    </>
  );
}
