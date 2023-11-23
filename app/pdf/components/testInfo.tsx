/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, View } from "@react-pdf/renderer";

export default function TestInfo({
  name,
  subject,
  date,
  section,
}: {
  name: string;
  subject: string;
  date: string | undefined;
  section: string;
}) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        fontSize: ".18in",
        marginTop: ".4in",
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: ".25in" }}>
        <View style={{ flexDirection: "row", gap: ".1in" }}>
          <Text>Name: </Text>
          <View style={{ width: "3in", borderBottom: "1px solid #B3B3B3" }} />
        </View>
        <View style={{ flexDirection: "row", gap: ".1in" }}>
          <Text>Subject: </Text>
          <View style={{ width: "3in", borderBottom: "1px solid #B3B3B3" }} />
        </View>
      </View>
      <View style={{ gap: ".25in" }}>
        <View style={{ flexDirection: "row", gap: ".1in" }}>
          <Text>Date: </Text>
          <View style={{ width: "2in", borderBottom: "1px solid #B3B3B3" }} />
        </View>
        <View style={{ flexDirection: "row", gap: ".1in" }}>
          <Text>Section: </Text>
          <View style={{ width: "2in", borderBottom: "1px solid #B3B3B3" }} />
        </View>
      </View>
    </View>
  );
}
