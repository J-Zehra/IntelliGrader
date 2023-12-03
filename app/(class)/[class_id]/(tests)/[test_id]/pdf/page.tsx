/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import {
  Document,
  Page,
  View,
  StyleSheet,
  PDFViewer,
  Text,
} from "@react-pdf/renderer";
import axios from "axios";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FetchedTestInfoToGeneratePaper } from "@/utils/types";
import ControlNumber from "./components/controlNumber";
import TestInfo from "./components/testInfo";
import Bubbles from "./components/bubbles";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    paddingVertical: ".25in",
    paddingHorizontal: ".5in",
    fontFamily: "Helvetica",
  },
  viewer: {
    width: "100%",
    height: "100vh",
  },
});

export default function PDFPage() {
  const { test_id } = useParams();

  const { data: testData, isLoading } = useQuery({
    queryKey: ["generate-paper"],
    queryFn: async () => {
      let test: Partial<FetchedTestInfoToGeneratePaper> = {};
      await axios.get(`/api/tests/generate/${test_id}`).then((res) => {
        test = res.data;
      });

      return test;
    },
  });

  console.log(testData);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        {testData?.class?.students?.map((student) => {
          return (
            <Page size="A4" style={styles.page}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: ".2in" }}>
                  {testData.testName}
                </Text>
                <ControlNumber number={student.rollNumber} />
              </View>
              <View
                style={{
                  marginTop: ".2in",
                  width: "100%",
                  borderBottom: "1px solid #E2E2E2",
                }}
              />
              <TestInfo
                name={`${student.firstName} ${student.middleName.charAt(0)}. ${
                  student.lastName
                }`}
                course={testData.class!.course}
                programAndSection={`${testData.class!.program} ${
                  testData.class!.section
                }`}
                date=""
              />
              <Bubbles test={testData.testParts!} />
            </Page>
          );
        })}
      </Document>
    </PDFViewer>
  );
}