/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import {
  Document,
  Page,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import axios from "axios";
import { useParams } from "next/navigation";
import { Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FetchedTestInfoToGeneratePaper, QuestionType } from "@/utils/types";
import ControlNumber from "./components/controlNumber";
import TestInfo from "./components/testInfo";
import Choices from "./components/choices";
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
    return <Text>Loading</Text>;
  }

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        {testData?.class?.students?.map((student) => {
          return (
            <Page size="A4" style={styles.page}>
              <ControlNumber number={student.rollNumber.toString()} />
              <View
                style={{
                  marginTop: ".2in",
                  width: "100%",
                  borderBottom: "1px solid #E2E2E2",
                }}
              />
              <TestInfo
                name="Jazen Marana"
                subject="Programming"
                section="2"
                date=""
              />
              <View
                style={{
                  marginTop: ".6in",
                  flexDirection: "row",
                  gap: ".5in",
                  paddingHorizontal: ".2in",
                }}
              >
                <Choices
                  type={QuestionType.multipleChoice}
                  numberOfChoices={4}
                />
                <Choices
                  type={QuestionType.multipleChoice}
                  numberOfChoices={4}
                />
              </View>
              <View
                style={{
                  marginTop: ".2in",
                  height: "75%",
                  border: "1px solid black",
                  flexDirection: "row",
                  gap: ".5in",
                  paddingHorizontal: ".2in",
                }}
              >
                <Bubbles />
                <Bubbles />
              </View>
            </Page>
          );
        })}
      </Document>
    </PDFViewer>
  );
}
