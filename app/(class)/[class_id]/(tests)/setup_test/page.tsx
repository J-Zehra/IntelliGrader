/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import {
  Button,
  Center,
  Stack,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { ClassVariant, TestInfo } from "@/utils/types";
import { headerState } from "@/state/headerState";
import { setupTestStepState } from "@/state/stepState";
import { setupTestState } from "@/state/setupTestState";
import Loading from "@/components/loading";
import { useEffect } from "react";
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Confimation from "./components/confimation";
import {
  isAnswerSheetComplete,
  isBasicInfoComplete,
} from "./components/validations";

export default function SetupTest() {
  const navigate = useRouter();
  const setHeader = useSetRecoilState(headerState);
  const { class_id } = useParams();
  const toast = useToast();

  const [testInfo, setTestInfo] = useRecoilState(setupTestState);
  const [activeStep, setActiveStep] = useRecoilState(setupTestStepState);

  const createTest = (data: TestInfo) => {
    return axios.post("/api/create_test", data);
  };

  const validateTest = ({
    testName,
    classId,
  }: {
    testName: string;
    classId: string;
  }) => {
    return axios.post("/api/create_test/validate", { testName, classId });
  };

  const mutateTest = useMutation({
    mutationFn: createTest,
    mutationKey: ["create test"],
    onSuccess: (data) => {
      setHeader(data.data.testName);
      setTestInfo({
        answerIndices: [],
        classId: "",
        testName: "",
        parts: [],
        variant: ClassVariant.default,
        passingGrade: 50,
      });
      navigate.push(`/${class_id}/${data.data.id}/scan`);
    },

    onError: (error: AxiosError) => {
      const { data } = error.response!;
      const response = data as { error: string; message: string };

      toast({
        title: response.error,
        description: response.message,
        duration: 5000,
        position: "top",
        status: "error",
      });
    },
  });

  const mutateValidateTest = useMutation({
    mutationFn: validateTest,
    mutationKey: ["validate test"],
    onSuccess: () => {
      setActiveStep((prev) => prev + 1);
    },

    onError: (error: AxiosError) => {
      const { data } = error.response!;
      const response = data as { error: string; message: string };

      toast({
        title: response.error,
        description: response.message,
        duration: 5000,
        position: "top",
        status: "error",
      });
    },
  });

  const handleNext = () => {
    if (activeStep === 0) {
      if (isBasicInfoComplete(testInfo)) {
        toast({
          title: "Incomplete Field",
          description: "Please fill all the fields",
          status: "error",
          duration: 3000,
        });

        return;
      }

      if (testInfo.parts.some((item) => item.numberOfChoices > 10)) {
        toast({
          title: "Maximum Number Exceeded",
          description: "Number of Choices should not exceed 10",
          status: "error",
          duration: 3000,
        });

        return;
      }

      if (testInfo.parts.some((item) => item.points < 1)) {
        toast({
          title: "Invalid Points",
          description: "Points cannot be zero or negative",
          status: "error",
          duration: 3000,
        });

        return;
      }

      if (testInfo.parts.some((item) => item.points > 50)) {
        toast({
          title: "Invalid Points",
          description: "Points are too big and might not be intended",
          status: "error",
          duration: 3000,
        });

        return;
      }

      if (testInfo.passingGrade > 100 || testInfo.passingGrade < 0) {
        toast({
          title: "Invalid Passing Grade",
          description: "Passing grade cannot be negative and greater that 100",
          status: "error",
          duration: 3000,
        });

        return;
      }

      mutateValidateTest.mutate({
        testName: testInfo.testName,
        classId: class_id as string,
      });
    } else if (activeStep === 1) {
      if (!isAnswerSheetComplete(testInfo)) {
        toast({
          title: "Incomplete Answer",
          description: "Please select all the answers",
          status: "error",
          duration: 3000,
        });

        return;
      }
      setActiveStep((prev) => prev + 1);
    } else if (activeStep === 2) {
      const newTestInfo = { ...testInfo };
      newTestInfo.classId = class_id as string;
      mutateTest.mutate(newTestInfo);
    }
  };

  const steps = [<Step1 />, <Step2 />, <Confimation />];
  const [isDesktopLayout] = useMediaQuery("(min-width: 40em)");

  useEffect(() => {
    setActiveStep(0);
  }, [setActiveStep]);

  return (
    <Center w="100%">
      {mutateTest.isLoading ? <Loading message="Creating Test" /> : ""}
      <Stack
        mt="2rem"
        spacing="1.2rem"
        paddingBottom="2rem"
        w={isDesktopLayout ? "30rem" : "100%"}
      >
        {steps[activeStep]}
        <Stack direction="row" align="center" justify="end" spacing="1rem">
          <Button
            variant="ghost"
            display={activeStep === 0 ? "none" : "flex"}
            onClick={() => setActiveStep((prev) => prev - 1)}
          >
            Back
          </Button>
          <Button
            leftIcon={<AiOutlinePlus />}
            onClick={handleNext}
            p="1.6rem 1rem"
            colorScheme="blue"
            loadingText="Validating..."
            isLoading={mutateTest.isLoading || mutateValidateTest.isLoading}
          >
            {activeStep === 3 ? "Create Test" : "Next"}
          </Button>
        </Stack>
      </Stack>
    </Center>
  );
}
