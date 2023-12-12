/* eslint-disable react/no-array-index-key */
import { Text, View } from "@react-pdf/renderer";
import React from "react";

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
      {[...Array(numberOfChoices)].map((choice, choiceIndex) => (
        <View
          key={choiceIndex}
          style={{
            width: ".20in",
            height: ".20in",
            border: "1px solid black",
            borderRadius: "2in",
          }}
        />
      ))}
    </View>
  );
}
