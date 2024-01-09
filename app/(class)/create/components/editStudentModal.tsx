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
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { classInfoState } from "@/state/classInfoState";
import { StudentInfo } from "@/utils/types";

export default function EditStudentModal({
  isOpen,
  onClose,
  studentInfo,
}: {
  isOpen: boolean;
  onClose: () => void;
  studentInfo: StudentInfo;
}) {
  const [classInfo, setClassInfo] = useRecoilState(classInfoState);
  const [firstName, setFirstName] = useState<string>(studentInfo.firstName);
  const [lastName, setLastName] = useState<string>(studentInfo.lastName);
  const [middleName, setMiddleName] = useState<string>(studentInfo.middleName);
  const [rollNumber, setRollNumber] = useState<number>(studentInfo.rollNumber);

  const handleSave = () => {
    const studentInfoCopy = [...classInfo.students];
    const studentData: StudentInfo = {
      firstName,
      lastName,
      middleName,
      rollNumber,
    };

    const itemIndex = studentInfoCopy.findIndex(
      (item) => item.rollNumber === studentInfo.rollNumber,
    );

    studentInfoCopy[itemIndex] = {
      ...studentData,
    };

    setClassInfo((prev) => ({ ...prev, students: studentInfoCopy }));
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
          <Stack pt={5} spacing={2.5}>
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

        <ModalFooter paddingTop={0}>
          <Button colorScheme="blue" onClick={handleSave}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
