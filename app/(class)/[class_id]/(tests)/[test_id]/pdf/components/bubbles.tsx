/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-syntax */
import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { QuestionPart, QuestionType } from "@/utils/types";

type ExtendedQuestion = {
  questionType: QuestionType;
  numberOfChoices: number;
};

function createExtendedArray(parts: QuestionPart[]): ExtendedQuestion[] {
  const extendedArray: ExtendedQuestion[] = [];

  for (const part of parts) {
    for (let i = 0; i < part.totalNumber; i += 1) {
      extendedArray.push({
        questionType: part.questionType,
        numberOfChoices: part.numberOfChoices,
      });
    }
  }

  return extendedArray;
}

export default function Bubbles({ test }: { test: QuestionPart[] }) {
  const combinedParts = createExtendedArray(test);

  console.log(combinedParts);

  // Split the combined parts into two columns with a maximum of 25 items per column
  const column1 = combinedParts.slice(0, 25);
  const column2 = combinedParts.slice(25);

  return (
    <View
      style={{
        marginTop: ".4in",
        height: "80%",
        border: "1px solid black",
        flexDirection: "row",
        gap: ".5in",
        paddingHorizontal: ".2in",
      }}
    >
      {/* Column 1 */}
      <View
        style={{
          fontSize: ".16in",
          flex: 1,
          gap: ".2in",
          paddingVertical: ".2in",
        }}
      >
        {column1.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              gap: ".25in",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={{ textAlign: "center", paddingRight: ".1in" }}>
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </Text>
            {[...Array(item.numberOfChoices)].map((choice, choiceIndex) => (
              <View
                key={choiceIndex}
                style={{
                  width: ".25in",
                  height: ".25in",
                  border: "1px solid black",
                  borderRadius: "2in",
                }}
              />
            ))}
          </View>
        ))}
      </View>

      {/* Column 2 */}
      <View
        style={{
          fontSize: ".16in",
          flex: 1,
          gap: ".2in",
          paddingVertical: ".2in",
        }}
      >
        {column2.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              gap: ".25in",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={{ textAlign: "center", paddingRight: ".1in" }}>
              {index + 26 < 10 ? `0${index + 26}` : index + 26}
            </Text>
            {[...Array(item.numberOfChoices)].map((choice, choiceIndex) => (
              <View
                key={choiceIndex}
                style={{
                  width: ".25in",
                  height: ".25in",
                  border: "1px solid black",
                  borderRadius: "2in",
                }}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
