/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-syntax */
import { View } from "@react-pdf/renderer";
import React from "react";
import { QuestionPart } from "@/utils/types";
import Parts from "./parts";

export default function Bubbles({ test }: { test: QuestionPart[] }) {
  const part1 = test[0];
  const part2 = test[1] || null;
  const part3 = test[2] || null;
  const part4 = test[3] || null;

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
          {[...Array(part1.totalNumber)].map((_, index) => (
            <Parts
              index={index}
              key={index}
              numberOfChoices={part1.numberOfChoices}
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
          {part2 &&
            [...Array(part2.totalNumber)].map((_, index) => (
              <Parts
                index={index}
                key={index}
                numberOfChoices={part2.numberOfChoices}
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
          {part3 &&
            [...Array(part3.totalNumber)].map((_, index) => (
              <Parts
                index={index}
                key={index}
                numberOfChoices={part3.numberOfChoices}
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
          {part4 &&
            [...Array(part4.totalNumber)].map((_, index) => (
              <Parts
                index={index}
                key={index}
                numberOfChoices={part4.numberOfChoices}
              />
            ))}
        </View>
      </View>
    </View>
  );
}
