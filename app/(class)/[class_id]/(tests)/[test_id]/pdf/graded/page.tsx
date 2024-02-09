/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import Loading from "@/components/loading";
import { FetchedTestInfoToGeneratePaper, Grade } from "@/utils/types";
import {
  Document,
  PDFDownloadLink,
  StyleSheet,
  Page,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";
import { Button, Stack, Text as ChakraText } from "@chakra-ui/react";
import Lottie from "react-lottie-player";
import moment from "moment";
import ControlNumber from "../components/controlNumber";
import TestInfo from "../components/testInfo";
import DoneAnimation from "../../../../../../../public/done_animation.json";
import GradedBubbles from "../components/gradedBubbles";

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

export default function GradedPDF() {
  const { test_id } = useParams();

  const getStudentGrades = async () => {
    const id = test_id;
    let studentGrade: Grade[] = [];
    await axios.get(`/api/student_grades/${id}`).then((res) => {
      studentGrade = res.data;
    });

    return studentGrade;
  };

  const { data: studentGrades, isLoading } = useQuery({
    queryFn: getStudentGrades,
    queryKey: ["get-student-grades", test_id],
  });

  const { data: testData, isLoading: isTestDataLoading } = useQuery({
    queryKey: ["generate-paper"],
    queryFn: async () => {
      let test: Partial<FetchedTestInfoToGeneratePaper> = {};
      await axios.get(`/api/tests/generate/${test_id}`).then((res) => {
        test = res.data;
      });

      return test;
    },
    refetchOnMount: false,
  });

  console.log(studentGrades);

  if (isLoading || isTestDataLoading) {
    return <Loading message="Getting Data.." remove />;
  }

  function BubbleSheetDoc() {
    return (
      <Document>
        {studentGrades?.map((student) => {
          return (
            <Page size={[8.5 * 72, 13 * 72]} style={styles.page}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: ".2in" }}>
                  {testData!.testName}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: ".35in",
                    color: student.status === "Passed" ? "#259358" : "#C81A1A",
                    marginLeft: ".8in",
                  }}
                >
                  {`${student.numberOfCorrect}/${student.answerIndices.length}`}
                </Text>
                <Image
                  src={
                    student.status === "Passed" ? "/passed.png" : "/failed.png"
                  }
                  style={{
                    width: "1.2in",
                    marginLeft: ".5in",
                    transform: "rotate(-15deg)",
                  }}
                />
                <ControlNumber number={student.student.rollNumber} />
              </View>
              <View
                style={{
                  marginTop: ".2in",
                  marginBottom: ".2in",
                  width: "100%",
                  borderBottom: "1px solid #E2E2E2",
                }}
              />
              <TestInfo
                name={`${
                  student.student.firstName
                } ${student.student.middleName.charAt(0)}. ${
                  student.student.lastName
                }`}
                course={testData!.class!.course}
                programAndSection={`${testData!.class!.program} ${
                  testData!.class!.section
                }`}
                date={moment(student.createdAt).format("MMM Do YYYY")}
              />
              <GradedBubbles test={testData!.testParts!} grade={student} />
            </Page>
          );
        })}
      </Document>
    );
  }

  return (
    <Stack align="center" w="100%" spacing="1.5rem">
      <Lottie
        loop
        animationData={DoneAnimation}
        play
        style={{ width: 200, height: 200 }}
      />
      <ChakraText
        fontSize="1rem"
        opacity=".6"
        fontWeight="semibold"
        color="palette.button.primary"
      >
        Answer Sheet Ready to Download.
      </ChakraText>
      <PDFDownloadLink
        document={<BubbleSheetDoc />}
        fileName={`${testData?.class?.program} | ${testData?.testName} - Graded Test Papers`}
      >
        <Button>Download</Button>
      </PDFDownloadLink>
    </Stack>
  );
}
