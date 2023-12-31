"use client";

import { Stack, Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { BsArrowRightShort } from "react-icons/bs";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { ClassInfo } from "@/utils/types";
import { headerState } from "@/state/headerState";
import { classInfoState } from "@/state/classInfoState";
import { createClassStepState } from "@/state/stepState";
import Loading from "@/components/loading";
import Step1 from "./components/step1";
import Step2 from "./components/step2";

export default function CreateClass() {
  const navigate = useRouter();
  const toast = useToast();
  const setHeaderTitle = useSetRecoilState(headerState);
  const classInfo = useRecoilValue(classInfoState);
  const [activeStep, setActiveStep] = useRecoilState(createClassStepState);

  const createClass = (data: ClassInfo) => {
    return axios.post("/api/create_class", data);
  };

  const mutateClass = useMutation({
    mutationFn: createClass,
    mutationKey: ["create-class"],
    onSuccess: (data) => {
      setHeaderTitle(data.data.subject);
      navigate.push(`/${data.data.id}/dashboard`);
    },
  });

  const handleNext = () => {
    if (
      !classInfo.course ||
      !classInfo.section ||
      !classInfo.program ||
      !classInfo.year
    ) {
      toast({
        title: "Incomplete Fields.",
        description: "Please fill all the fields.",
        duration: 3000,
        position: "top",
        status: "error",
      });
      return;
    }

    if (activeStep === 1) {
      mutateClass.mutate(classInfo);
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const steps = [<Step1 />, <Step2 />];

  return (
    <>
      {mutateClass.isLoading ? <Loading message="Creating Class" /> : ""}
      {steps[activeStep]}
      <Stack direction="row" align="center" justify="end" spacing="1rem">
        <Button
          variant="ghost"
          fontSize=".9rem"
          onClick={() => navigate.back()}
        >
          Cancel
        </Button>
        <Button
          isLoading={mutateClass.isLoading}
          leftIcon={
            activeStep === 0 ? <BsArrowRightShort /> : <AiOutlinePlus />
          }
          onClick={handleNext}
          p="1.5rem 1rem"
          fontSize=".9rem"
        >
          {activeStep === 0 ? "Next" : "Create Class"}
        </Button>
      </Stack>
    </>
  );
}
