"use client";

import { Stack, Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import MultiInput from "./components/multiInput";

export default function CreateClass() {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<string>();
  const [section, setSection] = useState<string>();
  const [year, setYear] = useState<number | null>();
  const [subject, setSubject] = useState<string>();

  const clearAllState = () => {
    setCourse("");
    setSection("");
    setYear(null);
    setSubject("");
  };

  const handleCreateClass = () => {
    setIsLoading(true);
    const data = { course, section, year, subject };
    axios
      .post("/api/create_class", data)
      .then((res) => {
        setIsLoading(false);
        clearAllState();
        console.log(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        clearAllState();
        console.log(err);
      });
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
          value={year!}
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
          isLoading={isLoading}
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
