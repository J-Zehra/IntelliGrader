import { Image, Text, View } from "@react-pdf/renderer";

export default function ControlNumber({ number }: { number: number }) {
  const controlNumber = number < 10 ? `0${number}` : number.toString();
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
      <Text style={{ fontSize: ".15in" }}>Control #</Text>
      <View
        style={{
          position: "relative",
          width: "1.2in",
          height: ".5in",
          paddingVertical: ".06in",
          paddingHorizontal: ".15in",
        }}
      >
        <Image
          src="/rollNumberMarker.png"
          style={{ position: "absolute", top: 0, left: 0, width: ".15in" }}
        />
        <Image
          src="/rollNumberMarker.png"
          style={{ position: "absolute", top: 0, right: 0, width: ".15in" }}
        />
        <Image
          src="/rollNumberMarker.png"
          style={{ position: "absolute", bottom: 0, left: 0, width: ".15in" }}
        />
        <Image
          src="/rollNumberMarker.png"
          style={{ position: "absolute", bottom: 0, right: 0, width: ".15in" }}
        />
        <Text
          style={{
            fontSize: ".20in",
            position: "absolute",
            top: ".15in",
            right: ".5in",
          }}
        >
          {controlNumber}
        </Text>
      </View>
    </View>
  );
}
