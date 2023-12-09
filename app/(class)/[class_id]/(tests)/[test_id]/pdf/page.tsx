/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import {
  Document,
  Page,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Text,
} from "@react-pdf/renderer";
import axios from "axios";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Stack,
  useMediaQuery,
  Text as ChakraText,
} from "@chakra-ui/react";
import Lottie from "react-lottie-player";
import { FetchedTestInfoToGeneratePaper } from "@/utils/types";
import Loading from "@/components/loading";
import ControlNumber from "./components/controlNumber";
import TestInfo from "./components/testInfo";
import Bubbles from "./components/bubbles";
import DoneAnimation from "../../../../../../public/done_animation.json";

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
  const [isLargerThan30] = useMediaQuery("(min-width: 30em)");

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
    return <Loading message="Generating" />;
  }

  function BubbleSheetDoc() {
    return (
      <Document>
        {testData?.class?.students?.map((student) => {
          return (
            <Page size="A4" style={styles.page}>
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
              <View
                style={{
                  marginTop: ".2in",
                  width: "100%",
                  borderBottom: "1px solid #E2E2E2",
                }}
              />
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  marginTop: ".4in",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: ".2in" }}>
                  {testData.testName}
                </Text>
                <ControlNumber number={student.rollNumber} />
              </View>
              <Bubbles test={testData.testParts!} />
            </Page>
          );
        })}
      </Document>
    );
  }

  if (!isLargerThan30) {
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
        <PDFDownloadLink document={<BubbleSheetDoc />} fileName="Bubble Sheet">
          <Button>Download</Button>
        </PDFDownloadLink>
      </Stack>
    );
  }

  return (
    <PDFViewer style={styles.viewer}>
      <BubbleSheetDoc />
    </PDFViewer>
  );
}
