/* eslint-disable react/no-array-index-key */
import { Text, View } from "@react-pdf/renderer";

function numberToArray(number: number) {
  // Convert the number to a string
  let numStr = number.toString();

  // Check if the number is a single digit
  if (numStr.length === 1) {
    // Add a leading zero
    numStr = `0${numStr}`;
  }

  // Convert the string to an array of integers
  const numArray = Array.from(numStr, Number);

  return numArray;
}

export default function ControlNumber({ number }: { number: number }) {
  // const controlNumber = number < 10 ? `0${number}` : number.toString();

  const controlNumber = numberToArray(number);

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        gap: ".5in",
      }}
    >
      <View
        style={{
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,

            width: ".30in",
            height: ".20in",
            border: "6px solid black",
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: ".30in",
            height: ".20in",
            border: "6px solid black",
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: ".30in",
            height: ".20in",
            border: "6px solid black",
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: ".30in",
            height: ".20in",
            border: "6px solid black",
          }}
        />
        <View
          style={{
            flexDirection: "column",
            gap: ".05in",
            padding: ".2in .4in",
          }}
        >
          <View style={{ flexDirection: "row", gap: ".1in" }}>
            {[...Array(10)].map((_, index) => {
              return index !== controlNumber[0] ? (
                <View
                  key={index}
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
                    {index}
                  </Text>
                </View>
              ) : (
                <View
                  key={index}
                  style={{
                    width: ".15in",
                    height: ".15in",
                    border: "1px solid black",
                    borderRadius: "2in",
                    backgroundColor: "black",
                  }}
                />
              );
            })}
          </View>
          <View style={{ flexDirection: "row", gap: ".1in" }}>
            {[...Array(10)].map((_, index) => {
              return index !== controlNumber[1] ? (
                <View
                  key={index}
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
                    {index}
                  </Text>
                </View>
              ) : (
                <View
                  key={index}
                  style={{
                    width: ".15in",
                    height: ".15in",
                    border: "1px solid black",
                    borderRadius: "2in",
                    backgroundColor: "black",
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}
