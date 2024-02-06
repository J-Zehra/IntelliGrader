import { setupTestState } from "@/state/setupTestState";
import { QuestionType, TestInfo } from "@/utils/types";
import { Input, Stack, Text } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useSetRecoilState } from "recoil";

export default function PointInput({
  partIndex,
  questionIndex,
  choiceIndex,
  questionType,
}: {
  partIndex: number;
  questionIndex: number;
  choiceIndex: number;
  questionType: QuestionType;
}) {
  const setTestInfo = useSetRecoilState<TestInfo>(setupTestState);

  const convertToLetter = useCallback((index: number, isTrueFalse: boolean) => {
    if (isTrueFalse) {
      return index === 0 ? "True" : "False";
    }
    return String.fromCharCode("A".charCodeAt(0) + index);
  }, []);

  const handlePointsChange = (value: number) => {
    console.time();
    setTestInfo((prevTestInfo) => ({
      ...prevTestInfo,
      parts: prevTestInfo.parts.map((part, pIndex) => {
        if (pIndex === partIndex) {
          return {
            ...part,
            mdatPoints: part.mdatPoints!.map((mdatPoint, qIndex) => {
              if (qIndex === questionIndex) {
                return {
                  ...mdatPoint,
                  choices: mdatPoint.choices.map((choice, cIndex) => {
                    if (cIndex === choiceIndex) {
                      return {
                        ...choice,
                        point: value || 1,
                      };
                    }
                    return choice;
                  }),
                };
              }
              return mdatPoint;
            }),
          };
        }
        return part;
      }),
    }));
    console.timeEnd();
  };

  return (
    <Stack direction="row" spacing="1rem" align="center">
      <Text
        opacity={0.6}
        fontWeight="medium"
        color="palette.text"
        fontSize=".9rem"
      >
        {convertToLetter(
          choiceIndex,
          questionType === QuestionType.trueOrFalse,
        )}
      </Text>
      <Input
        type="number"
        placeholder="Points"
        fontSize=".9rem"
        w="6rem"
        onChange={(e) => handlePointsChange(parseInt(e.target.value, 10))}
      />
    </Stack>
  );
}
