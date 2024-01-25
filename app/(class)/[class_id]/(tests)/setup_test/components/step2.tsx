/* eslint-disable react/no-array-index-key */

import { useEffect } from "react";
import { Stack, Text } from "@chakra-ui/react";
import AnswerSheet from "./answerSheet";

export default function Step2() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Stack spacing="1.5rem">
      <Text
        textAlign="center"
        color="palette.button.primary"
        fontWeight="semibold"
      >
        Create your Answer Sheet
      </Text>
      <AnswerSheet />;
    </Stack>
  );
}
