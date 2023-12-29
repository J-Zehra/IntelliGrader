/* eslint-disable react/no-array-index-key */
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

export default function Parts({
  index,
  numberOfChoices,
}: {
  index: number;
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
        style={{ textAlign: "center", fontSize: ".1in", paddingRight: ".1in" }}
      >
        {index + 1 < 10 ? `0${index + 1}` : index + 1}
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
              opacity: 0.3,
            }}
          >
            {getLetterFromIndex(choiceIndex)}
          </Text>
        </View>
      ))}
    </View>
  );
}
