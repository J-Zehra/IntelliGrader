/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FetchedStudentInfo, StudentInfo } from "@/utils/types";
import { queryClient } from "@/components/wrappers/queryWrapper";
import { IoMdAdd } from "react-icons/io";

export default function AddStudentModal({
  isOpen,
  onClose,
  classId,
  lastRollNumber,
}: {
  isOpen: boolean;
  onClose: () => void;
  lastRollNumber: number;
  classId: string;
}) {
  const { class_id } = useParams();
  const toast = useToast();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [rollNumber, setRollNumber] = useState<number>(lastRollNumber + 1);

  const addStudent = (data: { student: StudentInfo; classId: string }) => {
    return axios.post("/api/add_student", data);
  };

  const mutateStudent = useMutation({
    mutationFn: addStudent,
    mutationKey: ["add-student"],
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["students", class_id], (oldData) => [
        ...(oldData as FetchedStudentInfo[]),
        data,
      ]);
      onClose();
    },
    onError: (error: AxiosError) => {
      const { data } = error.response!;
      const response = data as { error: string; message: string };

      toast({
        title: response.error,
        description: response.message,
        duration: 3000,
        position: "top",
        status: "error",
      });
    },
  });

  const handleSave = () => {
    if (!firstName || !lastName) {
      toast({
        title: "Incomplete Fields.",
        description: "Please fill all required the fields.",
        duration: 3000,
        position: "top",
        status: "error",
      });
      return;
    }

    const firstNameHasSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(
      firstName,
    );

    const lastNameHasSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(
      lastName,
    );

    const middleNameHasSpecialCharacter =
      /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(middleName);

    const firstNameHasNumber = /\d/.test(firstName);

    const lastNameHasNumber = /\d/.test(lastName);

    const middleNameHasNumber = /\d/.test(middleName);

    if (firstNameHasSpecialCharacter || firstNameHasNumber) {
      toast({
        title: "Invalid First Name.",
        description: "Special character and number is not allowed.",
        duration: 3000,
        position: "top",
        status: "error",
      });

      return;
    }

    if (lastNameHasSpecialCharacter || lastNameHasNumber) {
      toast({
        title: "Invalid Last Name.",
        description: "Special character and number is not allowed.",
        duration: 3000,
        position: "top",
        status: "error",
      });

      return;
    }

    if (middleNameHasSpecialCharacter || middleNameHasNumber) {
      toast({
        title: "Invalid Middle Name.",
        description: "Special character and number is not allowed.",
        duration: 3000,
        position: "top",
        status: "error",
      });

      return;
    }

    const data = {
      student: {
        firstName,
        lastName,
        middleName,
        rollNumber,
      },
      classId,
    };
    mutateStudent.mutate(data);
  };

  return (
    // CREATE STATE FOR THE INPUTS AND THEN PASS IT TO THE RECOIL STATE]
    <Modal isOpen={isOpen} isCentered size="sm" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          borderTopRadius=".4rem"
          bg="palette.accent"
          paddingBlock="1.2rem"
          color="palette.background"
        >
          Add Student
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Stack pt={8} spacing={2.5}>
            <Input
              placeholder="Last Name"
              type="text"
              border="1px solid"
              borderColor="gray.100"
              h="3rem"
              maxLength={30}
              fontSize=".9rem"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              placeholder="First Name"
              type="text"
              border="1px solid"
              borderColor="gray.100"
              h="3rem"
              maxLength={30}
              fontSize=".9rem"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              placeholder="Middle Name"
              type="text"
              border="1px solid"
              borderColor="gray.100"
              h="3rem"
              maxLength={30}
              fontSize=".9rem"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <Stack direction="row" w="100%" spacing={2.5} align="center">
              <Text fontSize=".8rem">Roll #</Text>
              <Input
                w="5rem"
                placeholder="Roll Number"
                type="text"
                border="1px solid"
                borderColor="gray.100"
                h="3rem"
                fontSize=".9rem"
                disabled
                value={rollNumber}
                onChange={(e) => setRollNumber(parseInt(e.target.value, 10))}
              />
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            fontSize=".9rem"
            loadingText="Adding..."
            leftIcon={<IoMdAdd />}
            isLoading={mutateStudent.isLoading}
            onClick={handleSave}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
