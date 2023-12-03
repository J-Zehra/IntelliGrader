import { Text, View } from "@react-pdf/renderer";

export default function ControlNumber({ number }: { number: number }) {
  const controlNumber = number < 10 ? `0${number}` : number.toString();
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        gap: ".2in",
      }}
    >
      <Text style={{ fontSize: ".15in" }}>Control #</Text>
      <View
        style={{
          width: "1in",
          paddingVertical: ".06in",
          paddingHorizontal: ".15in",
          border: "1px solid black",
        }}
      >
        <Text style={{ fontSize: ".20in" }}>{controlNumber}</Text>
      </View>
    </View>
  );
}