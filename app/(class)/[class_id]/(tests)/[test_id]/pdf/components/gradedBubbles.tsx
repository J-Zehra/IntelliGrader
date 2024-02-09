/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-syntax */
import { View } from "@react-pdf/renderer";
import React from "react";
import { Grade, QuestionPart } from "@/utils/types";
import GradedParts from "./gradedParts";

export default function GradedBubbles({
  test,
  grade,
}: {
  test: QuestionPart[];
  grade: Grade;
}) {
  console.log("Test", test);

  const { answerIndices } = grade;

  let startIndex = 0;

  const partAnswerIndices = test.map((part) => {
    const { totalNumber } = part;
    const endIndex = startIndex + totalNumber;

    const indices = answerIndices.slice(startIndex, endIndex) || null;
    const correctIndices =
      grade.test.answerIndices.slice(startIndex, endIndex) || null;

    startIndex = endIndex;

    return { indices, correctIndices, numberOfChoices: part.numberOfChoices };
  });

  return (
    <View
      style={{
        marginTop: ".4in",
        height: "80%",
        flexDirection: "row",
        gap: ".5in",
        position: "relative",
        paddingHorizontal: ".25in",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: "-.15in",
          left: "-.15in",
          width: ".25in",
          height: ".25in",
          border: "6.5px solid black",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: "-.15in",
          right: "-.15in",
          width: ".25in",
          height: ".25in",
          border: "6.5px solid black",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: "-.15in",
          left: "-.15in",
          width: ".25in",
          height: ".25in",
          border: "6.5px solid black",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: "-.15in",
          right: "-.15in",
          width: ".25in",
          height: ".25in",
          border: "6.5px solid black",
        }}
      />
      {partAnswerIndices.map((part, partIndex) => (
        <View
          key={partIndex}
          style={{
            flex: 1,
            flexDirection: "column",
            height: "100%",
            gap: ".4in",
            justifyContent: "space-between",
            paddingVertical: ".25in",
          }}
        >
          <View
            style={{
              fontSize: ".16in",
              flex: 1,
              gap: ".07in",
            }}
          >
            {part.indices.map((answer, index) => (
              <GradedParts
                index={index}
                key={index}
                answer={answer}
                correctAnswer={part.correctIndices[index]}
                numberOfChoices={part.numberOfChoices}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
