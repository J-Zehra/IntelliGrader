"use client";

import { Stack, Button, Input, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { ClassInfo, ClassVariant } from "@/utils/types";
import { headerState } from "@/state/headerState";
// import MultiInput from "./components/multiInput";

export default function CreateClass() {
  const navigate = useRouter();
  const setHeaderTitle = useSetRecoilState(headerState);
  const [course, setCourse] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [subject, setSubject] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<ClassVariant>(
    ClassVariant.default,
  );

  const clearState = () => {
    setCourse("");
    setSection("");
    setYear(0);
    setSubject("");
  };

  const createClass = (data: ClassInfo) => {
    return axios.post("/api/create_class", data);
  };

  const mutateClass = useMutation({
    mutationFn: createClass,
    mutationKey: ["create-class"],
    onSuccess: (data) => {
      clearState();
      setHeaderTitle(data.data.subject);
      navigate.push(`/${data.data.id}`);
    },
  });

  const handleCreateClass = () => {
    const data: ClassInfo = { course, section, year, subject };

    mutateClass.mutate(data);
  };

  const bgVariant = (variant: ClassVariant) => {
    let background = "";

    switch (variant) {
      case ClassVariant.primary:
        background = "linear-gradient(to left, #003C8F, #006CFB)";
        break;
      case ClassVariant.secondary:
        background = "linear-gradient(to left, #015BD5, #0AA6FF)";
        // CODE
        break;
      case ClassVariant.tertiary:
        background = "linear-gradient(to left, #3A8FFF, #B8E5FF)";
        // CODE
        break;
      default:
        background = "linear-gradient(to left, #D6E6FF, #FAFCFF)";
    }

    return background;
  };

  return (
    <>
      <Stack spacing="1rem">
        <Input
          placeholder="Course"
          type="text"
          bg="gray.100"
          h="3.5rem"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <Input
          placeholder="Section"
          type="text"
          bg="gray.100"
          h="3.5rem"
          value={section}
          onChange={(e) => setSubject(e.target.value)}
        />
        {/* <MultiInput /> */}
        <Stack direction="row" spacing={2} align="center" h="4rem">
          {[
            ClassVariant.default,
            ClassVariant.primary,
            ClassVariant.secondary,
            ClassVariant.tertiary,
          ].map((item) => {
            return (
              <Box
                w={selectedVariant === item ? "2.5rem" : "2rem"}
                borderRadius=".2rem"
                h={selectedVariant === item ? "2.5rem" : "2rem"}
                border={
                  selectedVariant === item
                    ? "1px solid rgba(0, 0, 100, .5)"
                    : ""
                }
                opacity={selectedVariant === item ? 1 : 0.9}
                transition="all .1s ease"
                onClick={() => setSelectedVariant(item)}
                bg={bgVariant(item)}
                key={item}
              />
            );
          })}
        </Stack>
      </Stack>
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
          leftIcon={<AiOutlinePlus />}
          onClick={handleCreateClass}
          p="1.5rem 1rem"
          fontSize=".9rem"
        >
          Create class
        </Button>
      </Stack>
    </>
  );
}
