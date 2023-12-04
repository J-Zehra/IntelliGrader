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
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FetchedStudentInfo } from "@/utils/types";
import { queryClient } from "@/components/wrappers/queryWrapper";

export default function EditStudentModal({
  isOpen,
  onClose,
  student,
}: {
  isOpen: boolean;
  onClose: () => void;
  student: FetchedStudentInfo;
}) {
  const { class_id } = useParams();
  const [firstName, setFirstName] = useState<string>(student.firstName);
  const [lastName, setLastName] = useState<string>(student.lastName);
  const [middleName, setMiddleName] = useState<string>(student.middleName);
  const [rollNumber, setRollNumber] = useState<number>(student.rollNumber);

  const addStudent = (data: FetchedStudentInfo) => {
    return axios.put("/api/update_student", data);
  };

  const mutateStudent = useMutation({
    mutationFn: addStudent,
    mutationKey: ["edit-student"],
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["students", class_id], (oldData) => [
        ...(oldData as FetchedStudentInfo[]),
        data,
      ]);
      onClose();
    },
  });

  const handleSave = () => {
    if (!firstName || !lastName || !middleName) {
      return;
    }

    const data = {
      id: student.id,
      firstName,
      lastName,
      middleName,
      rollNumber,
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
          paddingBlock="1.5rem"
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
              h="3.5rem"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              placeholder="First Name"
              type="text"
              border="1px solid"
              borderColor="gray.100"
              h="3.5rem"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              placeholder="Middle Name"
              type="text"
              border="1px solid"
              borderColor="gray.100"
              h="3.5rem"
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
                h="3.5rem"
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
            isLoading={mutateStudent.isLoading}
            onClick={handleSave}
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
