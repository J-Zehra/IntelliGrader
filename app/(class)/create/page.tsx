"use client";

import { Stack, Button, useToast, Center } from "@chakra-ui/react";
import { useRouter } from "next13-progressbar";
import { AiOutlinePlus } from "react-icons/ai";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { BsArrowRightShort } from "react-icons/bs";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { ClassInfo, ClassVariant } from "@/utils/types";
import { headerState } from "@/state/headerState";
import { classInfoState } from "@/state/classInfoState";
import { createClassStepState } from "@/state/stepState";
import { useEffect } from "react";
import { queryClient } from "@/components/wrappers/queryWrapper";
import Step1 from "./components/step1";
import Step2 from "./components/step2";

export default function CreateClass() {
  const navigate = useRouter();
  const toast = useToast();
  const setHeaderTitle = useSetRecoilState(headerState);
  const classInfo = useRecoilValue(classInfoState);
  const setClassInfo = useSetRecoilState(classInfoState);
  const [activeStep, setActiveStep] = useRecoilState(createClassStepState);

  const createClass = (data: ClassInfo) => {
    return axios.post("/api/create_class", data);
  };

  const validateClass = (data: ClassInfo) => {
    return axios.post("/api/create_class/validate", data);
  };

  const mutateClass = useMutation({
    mutationFn: createClass,
    mutationKey: ["create-class"],
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["classes"], (oldData) => {
        const newData = [data, ...(oldData as any[])];
        return newData;
      });

      setClassInfo({
        schoolLevel: "College",
        program: "",
        section: "",
        course: "",
        year: 0,
        variant: ClassVariant.default,
        students: [],
      });

      setHeaderTitle(data.subject);
      toast({
        title: "Success!",
        description: "Class successfully created.",
        duration: 5000,
        position: "top",
        status: "success",
      });
      navigate.replace(`/${data.id}/dashboard`);
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

  const mutateValidateClass = useMutation({
    mutationFn: validateClass,
    mutationKey: ["validate-class"],
    onSuccess: () => {
      setActiveStep(1);
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
      if (!classInfo.program && classInfo.schoolLevel === "College") {
        toast({
          title: "Incomplete Fields.",
          description: "Please fill all the fields.",
          duration: 3000,
          position: "top",
          status: "error",
        });
        return;
      }

      if (!classInfo.section || !classInfo.course || !classInfo.year) {
        toast({
          title: "Incomplete Fields.",
          description: "Please fill all the fields.",
          duration: 3000,
          position: "top",
          status: "error",
        });

        return;
      }

      if (classInfo.program.length > 10) {
        toast({
          title: "Invalid Program.",
          description: "Please check if you input the wrong program.",
          duration: 3000,
          position: "top",
          status: "error",
        });

        return;
      }

      if (classInfo.course.length > 30) {
        toast({
          title: "Character Limit Reached.",
          description: "Please shorten your course name. 30 characters max.",
          duration: 3000,
          position: "top",
          status: "error",
        });

        return;
      }

      if (classInfo.section.length > 30) {
        toast({
          title: "Character Limit Reached.",
          description: "Please shorten your section name. 30 characters max.",
          duration: 3000,
          position: "top",
          status: "error",
        });

        return;
      }

      if (classInfo.year > 12) {
        toast({
          title: "Invalid Year Level.",
          description: "Please check if you input the wrong year.",
          duration: 3000,
          position: "top",
          status: "error",
        });

        return;
      }

      mutateValidateClass.mutate(classInfo);
    }

    if (activeStep === 1) {
      mutateClass.mutate(classInfo);
    }
  };

  const steps = [<Step1 />, <Step2 />];

  useEffect(() => {
    setActiveStep(0);
  }, [setActiveStep]);

  return (
    <Center flexDir="column" pb="2rem" pos="relative">
      {steps[activeStep]}
      <Stack
        direction="row"
        align="center"
        w="100%"
        pt="1.5rem"
        justify="end"
        spacing="1rem"
      >
        {activeStep > 0 ? (
          <Button
            variant="ghost"
            fontSize=".9rem"
            onClick={() => setActiveStep((prev) => prev - 1)}
          >
            Back
          </Button>
        ) : null}
        <Button
          onClick={handleNext}
          isLoading={mutateClass.isLoading || mutateValidateClass.isLoading}
          colorScheme="blue"
          loadingText={
            mutateValidateClass.isLoading ? "Validating..." : "Creating..."
          }
          leftIcon={
            activeStep === 0 ? <BsArrowRightShort /> : <AiOutlinePlus />
          }
          p="1.5rem 1rem"
          fontSize=".9rem"
        >
          {activeStep === 0 ? "Next" : "Create Class"}
        </Button>
      </Stack>
    </Center>
  );
}
