"use client";

import React, { ReactNode } from "react";
import {
  Box,
  IconButton,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useRouter } from "next13-progressbar";
import { setupTestStepState } from "@/state/stepState";
import CustomContainer from "../reusables/customContainer";

export default function TestSetupLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useRouter();
  const steps = [
    { title: "First", description: "Contact Info" },
    { title: "Second", description: "Date & Time" },
  ];

  const activeStep = useRecoilValue(setupTestStepState);
  const [isDesktopLayout] = useMediaQuery("(min-width: 40em)");

  return (
    <CustomContainer>
      <Stack pt="5rem" w="100%" align="center" spacing="1rem" h="100vh">
        <Stack w="100%" direction="row" justify="space-between" align="center">
          <IconButton
            aria-label="Return"
            p=".5rem"
            variant="ghost"
            fontSize="1.2rem"
            color="palette.button.primary"
            cursor="pointer"
            borderRadius=".2rem"
            onClick={() => navigate.back()}
          >
            <BsArrowReturnLeft />
          </IconButton>
          <Stack direction="row" align="center">
            <Text
              fontSize=".9rem"
              color="palette.button.primary"
              fontWeight="semibold"
              opacity=".8"
            >
              Setup Test
            </Text>
            <Box w=".5rem" h=".5rem" bg="palette.accent" borderRadius="5rem" />
          </Stack>
        </Stack>
        <Stack pt="1rem" spacing="2.5rem" w={isDesktopLayout ? "30rem" : "80%"}>
          <Stepper size="lg" index={activeStep}>
            {steps.map((step) => (
              <Step key={step.title}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Stack>
        <Box w="100%">{children}</Box>
      </Stack>
    </CustomContainer>
  );
}
