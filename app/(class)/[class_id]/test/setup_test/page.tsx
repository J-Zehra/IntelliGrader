/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Button, Stack, useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { QuestionType, TestInfo } from "@/utils/types";
import { headerState } from "@/state/headerState";
import { setupTestStepState } from "@/state/stepState";
import { setupTestState } from "@/state/setupTestState";
import Loading from "@/components/loading";
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Confimation from "./components/confimation";

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

  const mutateTest = useMutation({
    mutationFn: createTest,
    mutationKey: ["create test"],
    onSuccess: (data) => {
      setHeader(data.data.testName);
      setActiveStep(0);
      setTestInfo({
        answerIndices: [],
        classId: "",
        numberOfChoices: 0,
        points: 0,
        questionType: QuestionType.multipleChoice,
        testName: "",
        totalQuestions: 0,
      });
      navigate.push(`/${class_id}/test/${data.data.id}`);
    },
  });

  const handleNext = () => {
    if (activeStep === 0) {
      if (
        !testInfo.testName ||
        testInfo.totalQuestions === 0 ||
        (testInfo.questionType !== QuestionType.trueOrFalse &&
          testInfo.numberOfChoices === 0)
      ) {
        toast({
          title: "Incomplete Field",
          description: "Please fill all the fields",
          status: "error",
          duration: 3000,
        });

        return;
      }
      setActiveStep((prev) => prev + 1);
    } else if (activeStep === 1) {
      if (testInfo.answerIndices.length !== testInfo.totalQuestions) {
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
      if (testInfo.points === 0) {
        toast({
          title: "Points not selected",
          description: "Please select points for the questions",
          status: "error",
          duration: 3000,
        });
        return;
      }
      setActiveStep((prev) => prev + 1);
    } else if (activeStep === 3) {
      const newTestInfo = { ...testInfo };
      newTestInfo.classId = class_id as string;
      mutateTest.mutate(newTestInfo);
    }
  };

  const steps = [<Step1 />, <Step2 />, <Step3 />, <Confimation />];

  return (
    <>
      {mutateTest.isLoading ? <Loading message="Creating Test" /> : ""}
      <Stack mt="3rem" spacing="1.2rem">
        {steps[activeStep]}
        <Stack direction="row" align="center" justify="end" spacing="1rem">
          <Button
            variant="ghost"
            display={activeStep === 0 ? "none" : "flex"}
            onClick={() => setActiveStep((prev) => prev - 1)}
          >
            Cancel
          </Button>
          <Button
            leftIcon={<AiOutlinePlus />}
            onClick={handleNext}
            p="1.6rem 1rem"
            isLoading={mutateTest.isLoading}
          >
            {activeStep === 3 ? "Create Test" : "Next"}
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
