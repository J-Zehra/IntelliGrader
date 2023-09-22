"use client";

import { Button, Stack, useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useRecoilState } from "recoil";
import axios from "axios";
import { stepState } from "@/state/stepState";
import { setupTestState } from "@/state/setupTestState";
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Confimation from "./components/confimation";

export default function SetupTest() {
  const navigate = useRouter();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { class_id } = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [testInfo, setTestInfo] = useRecoilState(setupTestState);
  const [activeStep, setActiveStep] = useRecoilState(stepState);

  const handleNext = () => {
    if (activeStep === 0) {
      if (
        !testInfo.testName ||
        testInfo.totalQuestions === 0 ||
        testInfo.numberOfChoices === 0
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
      // DO REQUEST
      setLoading(true);
      axios
        .post("/api/create_test", testInfo)
        .then((res) => {
          setLoading(false);
          console.log(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const steps = [<Step1 />, <Step2 />, <Step3 />, <Confimation />];

  useEffect(() => {
    const newTestInfo = { ...testInfo };
    newTestInfo.classId = class_id as string;
    setTestInfo(newTestInfo);
  }, [class_id]);

  return (
    <Stack mt="3rem" spacing="1.2rem">
      {steps[activeStep]}
      <Stack direction="row" align="center" justify="end" spacing="1rem">
        <Button variant="ghost" onClick={() => navigate.back()}>
          Cancel
        </Button>
        <Button
          leftIcon={<AiOutlinePlus />}
          onClick={handleNext}
          p="1.6rem 1rem"
          isLoading={loading}
        >
          {activeStep === 3 ? "Create Test" : "Next"}
        </Button>
      </Stack>
    </Stack>
  );
}
