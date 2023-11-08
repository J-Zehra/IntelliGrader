"use client";

import React, { ReactNode } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { createClassStepState } from "@/state/stepState";
import CustomContainer from "../reusables/customContainer";

export default function CreateClassLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useRouter();

  const steps = [
    { title: "First", description: "Contact Info" },
    { title: "Second", description: "Date & Time" },
  ];

  const activeStep = useRecoilValue(createClassStepState);

  return (
    <CustomContainer>
      <Stack pt="6rem" spacing="2.5rem">
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
              Setup class
            </Text>
            <Box w=".5rem" h=".5rem" bg="palette.accent" borderRadius="5rem" />
          </Stack>
        </Stack>
        <Stack pt="2rem" w="100%" align="center" spacing="2.5rem">
          <Box w="75%">
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
          </Box>
        </Stack>
        {children}
      </Stack>
    </CustomContainer>
  );
}
