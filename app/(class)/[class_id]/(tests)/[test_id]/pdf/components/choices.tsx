import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { QuestionType } from "@/utils/types";

function convertToLetter(index: number) {
  return String.fromCharCode("A".charCodeAt(0) + index);
}

function convertToTorF(index: number) {
  if (index === 0) return "True";
  return "False";
}

export default function Choices({
  type,
  numberOfChoices,
}: {
  type: QuestionType;
  numberOfChoices: number;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        fontSize: ".20in",
        flex: 1,
      }}
    >
      <Text style={{ color: "#606060" }}>#</Text>
      {[...Array(numberOfChoices)].map((_, index) => {
        return (
          <Text>
            {type === QuestionType.trueOrFalse
              ? convertToTorF(index)
              : convertToLetter(index)}
          </Text>
        );
      })}
      <Text>B</Text>
      <Text>C</Text>
      <Text>D</Text>
    </View>
  );
}
