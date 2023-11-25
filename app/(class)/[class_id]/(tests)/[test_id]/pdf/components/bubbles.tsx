import { Text, View } from "@react-pdf/renderer";
import React from "react";

export default function Bubbles() {
  return (
    <View
      style={{
        fontSize: ".16in",
        flex: 1,
        justifyContent: "space-around",
        paddingVertical: ".2in",
      }}
    >
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ].map((item) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", paddingRight: ".1in" }}>
            {item < 10 ? `0${item}` : item}
          </Text>
          {["A", "B", "C", "D"].map(() => (
            <View
              style={{
                width: ".3in",
                height: ".3in",
                border: "1px solid black",
                borderRadius: "2in",
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
