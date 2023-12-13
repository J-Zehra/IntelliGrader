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
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { classInfoState } from "@/state/classInfoState";

export default function AddStudentModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const toast = useToast();
  const [classInfo, setClassInfo] = useRecoilState(classInfoState);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [rollNumber, setRollNumber] = useState<number>(
    classInfo.students.length + 1,
  );

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

    const studentData = {
      firstName,
      lastName,
      middleName,
      rollNumber,
    };
    setClassInfo((prev) => ({
      ...prev,
      students: [...prev.students, studentData],
    }));
    onClose();
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
              placeholder="Middle Name (Optional)"
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
          <Button colorScheme="blue" onClick={handleSave}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
