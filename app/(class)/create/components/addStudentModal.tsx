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
import { IoMdAdd } from "react-icons/io";

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
          paddingBlock="1.2rem"
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
              h="3rem"
              maxLength={30}
              fontSize=".9erm"
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
              fontSize=".9erm"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              placeholder="Middle Name (Optional)"
              type="text"
              border="1px solid"
              borderColor="gray.100"
              h="3rem"
              maxLength={30}
              fontSize=".9erm"
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
                fontSize=".9erm"
                disabled
                value={rollNumber}
                onChange={(e) => setRollNumber(parseInt(e.target.value, 10))}
              />
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter paddingTop={0}>
          <Button
            colorScheme="blue"
            leftIcon={<IoMdAdd />}
            fontSize=".9rem"
            onClick={handleSave}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
