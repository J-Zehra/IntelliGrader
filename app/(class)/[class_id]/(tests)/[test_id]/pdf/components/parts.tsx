/* eslint-disable react/no-array-index-key */
import { QuestionType } from "@/utils/types";
import { Text, View } from "@react-pdf/renderer";
import React from "react";

function getLetterFromIndex(index: number) {
  // Assuming the index is 0-based
  const baseCharCode = "A".charCodeAt(0);

  // Convert the index to the corresponding ASCII code for letters
  const letterCode = baseCharCode + index;

  // Convert the ASCII code back to the letter
  const letter = String.fromCharCode(letterCode);

  return letter;
}

function convertToTorF(index: number) {
  if (index === 0) return "T";
  return "F";
}

export default function Parts({
  index,
  questionType,
  numberOfChoices,
}: {
  index: number;
  questionType: QuestionType;
  numberOfChoices: number;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: ".12in",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: ".1in",
          paddingRight: ".1in",
          opacity: 0.5,
          marginLeft: index + 1 < 10 ? ".055in" : "",
        }}
      >
        {index + 1}
      </Text>
      {[...Array(numberOfChoices)].map((_, choiceIndex) => (
        <View
          key={choiceIndex}
          style={{
            width: ".15in",
            height: ".15in",
            border: "1px solid black",
            borderRadius: "2in",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: ".08in",
              opacity: 0.5,
            }}
          >
            {questionType === QuestionType.trueOrFalse
              ? convertToTorF(choiceIndex)
              : getLetterFromIndex(choiceIndex)}
          </Text>
        </View>
      ))}
    </View>
  );
}
