/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, View } from "@react-pdf/renderer";

export default function TestInfo({
  name,
  course,
  date,
  programAndSection,
}: {
  name: string;
  course: string;
  date: string | undefined;
  programAndSection: string;
}) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        fontSize: ".15in",
        marginVertical: ".1in",
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: ".25in" }}>
        <View style={{ flexDirection: "row", gap: ".1in" }}>
          <Text style={{ opacity: 0.6 }}>Name: </Text>
          <Text style={{ fontWeight: "semibold" }}>{name}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: ".1in" }}>
          <Text style={{ opacity: 0.6 }}>Program and Section: </Text>
          <Text style={{ fontWeight: "semibold" }}>{programAndSection}</Text>
        </View>
      </View>
      <View style={{ gap: ".25in" }}>
        <View style={{ flexDirection: "row", gap: ".1in" }}>
          <Text style={{ opacity: 0.6 }}>Date: </Text>
          <Text style={{ fontWeight: "semibold" }}>{date}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: ".1in" }}>
          <Text style={{ opacity: 0.6 }}>Course: </Text>
          <Text style={{ fontWeight: "semibold" }}>{course}</Text>
        </View>
      </View>
    </View>
  );
}
