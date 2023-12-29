/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import {
  Box,
  Center,
  Collapse,
  Radio,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { QuestionsMostGotRight } from "@/utils/types";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

function convertToLetter(index: number) {
  return String.fromCharCode("A".charCodeAt(0) + index);
}

export default function MostPickedAnswerItem({
  item,
  numberOfChoices,
}: {
  numberOfChoices: number;
  item: QuestionsMostGotRight;
}) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
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
          <Stack
            direction="row"
            h="100%"
            w="100%"
            paddingInline="1rem"
            align="center"
            justify="space-between"
          >
            {[...Array(numberOfChoices)].map((_, index) => {
              return (
                <Radio
                  opacity={0.8}
                  isChecked={item.correctAnswer === index}
                  colorScheme={item.correctAnswer === index ? "green" : ""}
                  key={index}
                  isReadOnly
                  borderColor="palette.text"
                >
                  <Text
                    opacity={0.6}
                    fontWeight={
                      item.correctAnswer === index ? "bold" : "semibold"
                    }
                    color={item.correctAnswer === index ? "green" : ""}
                    fontSize="1rem"
                  >
                    {convertToLetter(index)}
                  </Text>
                </Radio>
              );
            })}
          </Stack>
        </Box>
      </Stack>
      <Collapse in={isOpen} animateOpacity>
        <Stack bg="palette.light" borderRadius=".5rem" p="1rem">
          <Text
            fontSize=".9rem"
            color="palette.button.primary"
            fontWeight="semibold"
          >{`${item.studentCount} students got this right.`}</Text>
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
        fontSize="1.2rem"
        transform={isOpen ? "rotate(180deg)" : ""}
      >
        <MdKeyboardDoubleArrowDown />
      </Center>
    </>
  );
}
