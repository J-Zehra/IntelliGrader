/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import {
  Document,
  Page,
  View,
  StyleSheet,
  Text,
  usePDF,
} from "@react-pdf/renderer";
import axios from "axios";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button, Stack, Text as ChakraText } from "@chakra-ui/react";
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
  const [instance, updateInstance] = usePDF({});

  const { data: testData, isLoading } = useQuery({
    queryKey: ["generate-paper"],
    queryFn: async () => {
      let test: Partial<FetchedTestInfoToGeneratePaper> = {};
      await axios.get(`/api/tests/generate/${test_id}`).then((res) => {
        test = res.data;
      });

      updateInstance(
        <Document>
          {test?.class?.students?.map((student) => {
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
                    {test.testName}
                  </Text>
                  <ControlNumber number={student.rollNumber} />
                </View>
                <View
                  style={{
                    marginTop: ".2in",
                    marginBottom: ".1in",
                    width: "100%",
                    borderBottom: "1px solid #E2E2E2",
                  }}
                />
                <TestInfo
                  name={`${student.firstName} ${student.middleName.charAt(
                    0,
                  )}. ${student.lastName}`}
                  course={test.class!.course}
                  programAndSection={`${test.class!.program} ${
                    test.class!.section
                  }`}
                  date=""
                />
                <Bubbles test={test.testParts!} />
              </Page>
            );
          })}
        </Document>,
      );
      return test;
    },
    refetchOnMount: false,
  });

  console.log(testData);

  if (isLoading) {
    return <Loading message="Getting data.." remove />;
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
      {instance.loading ? (
        <Button isLoading={instance.loading} colorScheme="blue">
          Download
        </Button>
      ) : (
        <Button
          as="a"
          href={instance.url!}
          download={`${testData?.class?.program} | ${testData?.testName} - Bubble Sheet`}
        >
          Download
        </Button>
      )}
    </Stack>
  );
}
