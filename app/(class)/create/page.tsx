"use client";

import { Stack, Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { ClassInfo } from "@/utils/types";
import { headerState } from "@/state/headerState";
import MultiInput from "./components/multiInput";

export default function CreateClass() {
  const navigate = useRouter();
  const setHeaderTitle = useSetRecoilState(headerState);
  const [course, setCourse] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [subject, setSubject] = useState<string>("");

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
    mutationKey: ["create class"],
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

  return (
    <>
      <Stack spacing="1.2rem">
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
          onChange={(e) => setSection(e.target.value)}
        />
        <Input
          placeholder="Year"
          type="number"
          bg="gray.100"
          h="3.5rem"
          value={year === 0 ? "" : year}
          onChange={(e) => setYear(parseInt(e.target.value, 10))}
        />
        <Input
          placeholder="Subject"
          type="text"
          bg="gray.100"
          h="3.5rem"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <MultiInput />
      </Stack>
      <Stack direction="row" align="center" justify="end" spacing="1rem">
        <Button variant="ghost" onClick={() => navigate.back()}>
          Cancel
        </Button>
        <Button
          isLoading={mutateClass.isLoading}
          leftIcon={<AiOutlinePlus />}
          onClick={handleCreateClass}
          p="1.6rem 1rem"
        >
          Create class
        </Button>
      </Stack>
    </>
  );
}
