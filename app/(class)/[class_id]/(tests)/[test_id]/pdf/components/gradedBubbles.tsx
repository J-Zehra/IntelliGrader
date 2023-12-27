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
  const part1AnswerIndices = grade.answerIndices.slice(0, test[0].totalNumber);
  const part2AnswerIndices =
    grade.answerIndices.slice(
      test[0].totalNumber,
      test[0].totalNumber + test[1].totalNumber,
    ) || null;
  const part3AnswerIndices =
    grade.answerIndices.slice(
      test[0].totalNumber + test[1].totalNumber,
      test[0].totalNumber + test[1].totalNumber + test[2].totalNumber,
    ) || null;
  const part4AnswerIndices =
    grade.answerIndices.slice(
      test[0].totalNumber + test[1].totalNumber + test[2].totalNumber,
      test[0].totalNumber +
        test[1].totalNumber +
        test[2].totalNumber +
        test[3].totalNumber,
    ) || null;

  const part1CorrectAnswerIndices = grade.test.answerIndices.slice(
    0,
    test[0].totalNumber,
  );
  const part2CorrectAnswerIndices =
    grade.test.answerIndices.slice(
      test[0].totalNumber,
      test[0].totalNumber + test[1].totalNumber,
    ) || null;
  const part3CorrectAnswerIndices =
    grade.test.answerIndices.slice(
      test[0].totalNumber + test[1].totalNumber,
      test[0].totalNumber + test[1].totalNumber + test[2].totalNumber,
    ) || null;
  const part4CorrectAnswerIndices =
    grade.test.answerIndices.slice(
      test[0].totalNumber + test[1].totalNumber + test[2].totalNumber,
      test[0].totalNumber +
        test[1].totalNumber +
        test[2].totalNumber +
        test[3].totalNumber,
    ) || null;

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
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          height: "100%",
          gap: ".4in",
          justifyContent: "space-between",
          paddingVertical: ".25in",
        }}
      >
        {/* Part 1 */}
        <View
          style={{
            fontSize: ".16in",
            flex: 1,
            gap: ".07in",
          }}
        >
          {part1AnswerIndices.map((answer, index) => (
            <GradedParts
              index={index}
              key={index}
              answer={answer}
              correctAnswer={part1CorrectAnswerIndices[index]}
              numberOfChoices={test[0].numberOfChoices}
            />
          ))}
        </View>

        {/* Part 2 */}
        <View
          style={{
            fontSize: ".16in",
            flex: 1,
            gap: ".07in",
          }}
        >
          {part2AnswerIndices &&
            part2AnswerIndices.map((answer, index) => (
              <GradedParts
                index={index}
                key={index}
                answer={answer}
                correctAnswer={part2CorrectAnswerIndices[index]}
                numberOfChoices={test[1].numberOfChoices}
              />
            ))}
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          height: "100%",
          gap: ".4in",
          justifyContent: "space-between",
          paddingVertical: ".25in",
        }}
      >
        {/* Part 3 */}
        <View
          style={{
            fontSize: ".16in",
            flex: 1,
            gap: ".07in",
          }}
        >
          {part3AnswerIndices &&
            part3AnswerIndices.map((answer, index) => (
              <GradedParts
                index={index}
                key={index}
                answer={answer}
                correctAnswer={part3CorrectAnswerIndices[index]}
                numberOfChoices={test[2].numberOfChoices}
              />
            ))}
        </View>

        {/* Part 4 */}
        <View
          style={{
            fontSize: ".16in",
            flex: 1,
            gap: ".07in",
          }}
        >
          {part4AnswerIndices &&
            part4AnswerIndices.map((answer, index) => (
              <GradedParts
                index={index}
                key={index}
                answer={answer}
                correctAnswer={part4CorrectAnswerIndices[index]}
                numberOfChoices={test[3].numberOfChoices}
              />
            ))}
        </View>
      </View>
    </View>
  );
}
