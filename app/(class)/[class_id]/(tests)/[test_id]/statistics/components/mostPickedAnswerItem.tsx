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
import { FetchedStudentInfo, QuestionsMostGotRight } from "@/utils/types";
import { MdOutlineArrowDropDown } from "react-icons/md";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

function convertToLetter(index: number) {
  return String.fromCharCode("A".charCodeAt(0) + index);
}

export default function MostPickedAnswerItem({
  item,
  numberOfChoices,
  index,
}: {
  numberOfChoices: number;
  index: number;
  item: QuestionsMostGotRight;
}) {
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

  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      {index === 0 ? (
        <Center
          onClick={onToggle}
          color="palette.button.primary"
          fontSize="1.5rem"
          transform={!isOpen ? "rotate(180deg)" : ""}
        >
          <MdOutlineArrowDropDown />
        </Center>
      ) : null}
      {index === 0 ? (
        <Collapse in={isOpen} animateOpacity>
          <Stack bg="palette.light" borderRadius=".5rem" p="1rem">
            <Text
              fontSize=".9rem"
              color="palette.button.primary"
              fontWeight="semibold"
            >{`${item.studentCount} out of ${studentInfo?.length} ${
              item.studentCount > 1 ? "students" : "student"
            } got these questions right.`}</Text>
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
      ) : null}
      <Stack bg="palette.light" direction="row" borderRadius=".5rem">
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
            spacing="1rem"
            align="center"
            justify="space-start"
          >
            {[...Array(numberOfChoices)].map((_, index2) => {
              return (
                <WrapItem>
                  <Radio
                    opacity={0.8}
                    isChecked={item.correctAnswer === index2}
                    colorScheme={item.correctAnswer === index2 ? "green" : ""}
                    key={index2}
                    isReadOnly
                    borderColor="palette.text"
                  >
                    <Text
                      opacity={0.6}
                      fontWeight={
                        item.correctAnswer === index2 ? "bold" : "semibold"
                      }
                      color={item.correctAnswer === index2 ? "green" : ""}
                      fontSize=".9rem"
                    >
                      {convertToLetter(index2)}
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
