"use client";

import {
  Button,
  Center,
  Highlight,
  Image,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

export default function QuickTutorialPage() {
  const steps = [
    { step: 1, text: "CREATE a new class.", images: ["/tutorial/step1.png"] },
    {
      step: 2,
      text: "FILL in the required fields.",
      images: ["/tutorial/step2.png"],
    },
    {
      step: 3,
      text: "ADD your students.",
      images: ["/tutorial/step3.png"],
      note: "When uploading CSV file for students, make sure that the columns are labeled [firstName, middleName, lastName].",
    },
    {
      step: 4,
      text: "SETUP a new test.",
      images: ["/tutorial/step4.1.png"],
    },
    {
      step: 5,
      text: "FILL in test information accordingly.",
      images: ["/tutorial/step5.1.png"],
    },
    {
      step: 6,
      text: "SETUP your answer sheet.",
      images: ["/tutorial/step5.2.png"],
    },
    {
      step: 7,
      text: "NOW start scanning.",
      images: ["/tutorial/step7.png"],
    },
  ];

  return (
    <Stack>
      <Text fontSize="1.8rem" fontWeight="bold" opacity={0.8}>
        QUICK TUTORIAL
      </Text>
      <Text fontWeight="medium" opacity={0.8}>
        How to use IntelliGrader and start scanning?
      </Text>
      <Stack paddingTop="2.5rem" spacing="3rem">
        {steps.map((step) => {
          return (
            <Stack>
              <Text fontSize=".9rem">
                <Highlight
                  query={["CREATE", "FILL", "ADD", "SETUP", "NOW"]}
                  styles={{ fontWeight: "semibold" }}
                >
                  {`${step.step}.  ${step.text}`}
                </Highlight>
              </Text>
              <Wrap>
                {step.images.map((image: string) => {
                  return (
                    <Center justifyContent={{ base: "center", md: "start" }}>
                      <Image
                        src={image}
                        w={{ base: "80%", sm: "50%", md: "20%" }}
                      />
                    </Center>
                  );
                })}
              </Wrap>
              {step.note ? (
                <Stack
                  borderRadius="1rem"
                  bg="palette.light"
                  spacing="1rem"
                  p="1rem"
                >
                  <Text fontSize=".9rem">
                    <Highlight query="NOTE:" styles={{ fontWeight: "bold" }}>
                      {`NOTE: ${step.note}`}
                    </Highlight>
                  </Text>
                  <Button
                    fontSize=".9rem"
                    as="a"
                    target="+black"
                    download="sample.csv"
                    href="/samplecsv/sample.csv"
                    leftIcon={<AiOutlineDownload />}
                    variant="link"
                    w="fit-content"
                    minW="fit-content"
                    color="palette.button.primary"
                  >
                    Download Sample
                  </Button>
                </Stack>
              ) : null}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
