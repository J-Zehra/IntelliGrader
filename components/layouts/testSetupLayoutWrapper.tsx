"use client";

import React, { ReactNode } from "react";
import {
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { stepState } from "@/state/stepState";
import CustomContainer from "../reusables/customContainer";

export default function TestSetupLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const steps = [
    { title: "First", description: "Contact Info" },
    { title: "Second", description: "Date & Time" },
    { title: "Third", description: "Select Rooms" },
  ];

  const activeStep = useRecoilValue(stepState);

  return (
    <CustomContainer>
      <Stack pt="2rem" spacing="2.5rem">
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
      {children}
    </CustomContainer>
  );
}
