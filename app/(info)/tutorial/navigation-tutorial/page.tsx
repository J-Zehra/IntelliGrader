"use client";

import { Highlight, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function NavigationTutorial() {
  const classNavBarInfo = [
    {
      link: "Home",
      info: "The home page or dashboard where you can see the number of classes you have and the tests you made. It also has a few quick links for easy access.",
    },
    { link: "Tests", info: "Here lies the list of the tests you made" },
    { link: "Students", info: "Here are the list of students in the class" },
    {
      link: "Class Statistics",
      info: "This shows the overall performance of the class in all the tests made",
    },
  ];

  const testNavBarInfo = [
    {
      link: "About",
      info: "This is where you can see the information about the test: When was it created, how many items and also the answer sheet. You can also generate and download the bubble sheet as a pdf",
    },
    {
      link: "Multi-file Upload",
      info: "If you want to upload and scan multiple test paper at once",
    },
    {
      link: "Scan",
      info: "This will open the camera and start grading after a succesful capture",
    },
    {
      link: "Grades",
      info: "Here are the list of all the graded students in the class",
    },
    {
      link: "Statistics",
      info: "The difference between this nav and the class statistics is that this only includes the performance of the class in this test while the latter includes all of the tests made",
    },
  ];

  return (
    <Stack>
      <Text fontSize="1.8rem" fontWeight="bold" opacity={0.8}>
        NAVIGATION GUIDE
      </Text>
      <Text fontWeight="normal" opacity={0.8}>
        IntilliGrader has two main navigation bar: Class Navigation Bar and Test
        Navigation Bar. This guide will walk you through all of its links and
        functions
      </Text>
      <Stack pt="2rem">
        <Text fontWeight="bold" opacity={0.8}>
          Class Navigation Bar
        </Text>
        <Image
          src="/tutorial/navigation/classNavGuide.png"
          w={{ base: "100%", sm: "50%", md: "20%" }}
        />
        <Stack paddingLeft="1rem" spacing="1rem">
          {classNavBarInfo.map((nav) => {
            return (
              <Text fontSize=".9rem">
                <Highlight
                  query={["Class Statistics.", "Tests.", "Students.", "Home."]}
                  styles={{ fontWeight: "semibold" }}
                >{`${nav.link}.  ${nav.info}`}</Highlight>
              </Text>
            );
          })}
        </Stack>
      </Stack>
      <Stack pt="2rem">
        <Text fontWeight="bold" opacity={0.8}>
          Test Navigation Bar
        </Text>
        <Image
          src="/tutorial/navigation/testNavGuide.png"
          w={{ base: "100%", sm: "50%", md: "20%" }}
        />
        <Stack paddingLeft="1rem" spacing="1rem">
          {testNavBarInfo.map((nav) => {
            return (
              <Text fontSize=".9rem">
                <Highlight
                  query={[
                    "Scan.",
                    "About.",
                    "Grades.",
                    "Multi-file Upload.",
                    "Statistics",
                  ]}
                  styles={{ fontWeight: "semibold" }}
                >{`${nav.link}.  ${nav.info}`}</Highlight>
              </Text>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}
