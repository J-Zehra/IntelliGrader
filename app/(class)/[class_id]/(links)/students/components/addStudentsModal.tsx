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
import { StudentInfo } from "@/utils/types";

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
    onSuccess: () => {
      onClose();
    },
  });

  const handleSave = () => {
    if (!firstName || !lastName || !middleName) {
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
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
