/* eslint-disable react/no-array-index-key */

import { useEffect } from "react";
import { Stack, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { setupTestState } from "@/state/setupTestState";
import AnswerSheet from "./answerSheet";
import MDATAnswerSheet from "./mdatAnswerSheet";

export default function Step2() {
  const testInfo = useRecoilValue(setupTestState);

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
      {testInfo.format === "Regular" ? <AnswerSheet /> : <MDATAnswerSheet />}
    </Stack>
  );
}
