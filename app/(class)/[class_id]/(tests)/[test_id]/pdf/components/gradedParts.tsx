/* eslint-disable react/no-array-index-key */
import { Text, View } from "@react-pdf/renderer";
import React from "react";

export default function GradedParts({
  index,
  answer,
  correctAnswer,
  numberOfChoices,
}: {
  index: number;
  answer: number;
  correctAnswer: number;
  numberOfChoices: number;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: ".2in",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Text
        style={{ textAlign: "center", fontSize: ".1in", paddingRight: ".1in" }}
      >
        {index + 1 < 10 ? `0${index + 1}` : index + 1}
      </Text>
      {[...Array(numberOfChoices)].map((_, choiceIndex) => {
        if (answer === correctAnswer && answer === choiceIndex) {
          return (
            <View
              key={choiceIndex}
              style={{
                width: ".15in",
                height: ".15in",
                border: "1px solid #259358",
                borderRadius: "2in",
                backgroundColor: "#259358",
              }}
            />
          );
        }

        if (answer === choiceIndex) {
          return (
            <View
              key={choiceIndex}
              style={{
                width: ".15in",
                height: ".15in",
                border: "1px solid #C81A1A",
                borderRadius: "2in",
                backgroundColor: "#C81A1A",
              }}
            />
          );
        }

        if (choiceIndex === correctAnswer) {
          return (
            <View
              key={choiceIndex}
              style={{
                width: ".15in",
                height: ".15in",
                border: "1px solid #259358",
                borderRadius: "2in",
                backgroundColor: "#259358",
              }}
            />
          );
        }

        return (
          <View
            key={choiceIndex}
            style={{
              width: ".15in",
              height: ".15in",
              border: "1px solid black",
              borderRadius: "2in",
            }}
          />
        );
      })}
    </View>
  );
}
