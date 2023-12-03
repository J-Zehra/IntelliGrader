/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { Box, Center, Radio, Stack, Text } from "@chakra-ui/react";
import { QuestionsMostGotRight } from "@/utils/types";

function convertToLetter(index: number) {
  return String.fromCharCode("A".charCodeAt(0) + index);
}

export default function MostPickedAnswerItem({
  item,
}: {
  item: QuestionsMostGotRight;
}) {
  return (
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
          {[...Array(5)].map((_, index) => {
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
  );
}