import {
  Button,
  Center,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { IoMdRemove } from "react-icons/io";
import { classInfoState } from "@/state/classInfoState";
import { StudentInfo } from "@/utils/types";
import AddStudentModal from "./addStudentModal";
import EditStudentModal from "./editStudentModal";
import UploadCSV from "./uploadCSV";

export default function Step2() {
  const {
    isOpen: isAddModalopen,
    onClose: onAddModalClose,
    onOpen: onAddModalOpen,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onClose: onEditModalClose,
    onOpen: onEditModalOpen,
  } = useDisclosure();
  const [selectedStudentToEdit, setSelectedStudentToEdit] =
    useState<StudentInfo>({
      firstName: "",
      middleName: "",
      lastName: "",
      rollNumber: 0,
    });
  const [classInfo, setClassInfo] = useRecoilState(classInfoState);

  const handleRemove = (rollNumber: number) => {
    setClassInfo((prev) => ({
      ...prev,
      students: prev.students.filter((item) => item.rollNumber !== rollNumber),
    }));
  };

  const handleEdit = (student: StudentInfo) => {
    setSelectedStudentToEdit(student);
    onEditModalOpen();
  };

  return (
    <Stack paddingBottom="2rem">
      {classInfo.students.map((student) => {
        return (
          <Stack
            direction="row"
            align="center"
            justify="space-between"
            borderRadius=".5rem"
            spacing={1}
          >
            <Center
              p=".5rem"
              border="1px solid"
              borderColor="palette.light"
              bg="rgba(0, 0, 100, .01)"
              borderRadius=".3rem"
              flex={1}
            >
              <Text>{student.rollNumber}</Text>
            </Center>
            <Center
              borderRadius=".3rem"
              border="1px solid"
              borderColor="palette.light"
              bg="rgba(0, 0, 100, .01)"
              p=".5rem 1rem"
              justifyContent="start"
              flex={3}
            >
              <Text>{student.lastName}</Text>
            </Center>
            <IconButton
              bg="palette.light"
              aria-label="Edit"
              variant="outline"
              onClick={() => handleEdit(student)}
              icon={<AiOutlineEdit />}
            />
            <IconButton
              bg="palette.light"
              aria-label="Remove"
              variant="outline"
              onClick={() => handleRemove(student.rollNumber)}
              icon={<IoMdRemove />}
            />
          </Stack>
        );
      })}
      <Stack paddingTop="1rem" spacing=".8rem">
        <UploadCSV />
        <Button
          borderRadius=".8rem"
          w="100%"
          h="3.5rem"
          bg="palette.light"
          color="palette.accent"
          boxShadow="none"
          gap="1rem"
          onClick={onAddModalOpen}
          leftIcon={<AiOutlinePlus />}
        >
          Add Student
        </Button>
      </Stack>

      {isAddModalopen ? (
        <AddStudentModal isOpen={isAddModalopen} onClose={onAddModalClose} />
      ) : null}
      {isEditModalOpen ? (
        <EditStudentModal
          studentInfo={selectedStudentToEdit}
          isOpen={isEditModalOpen}
          onClose={onEditModalClose}
        />
      ) : null}
    </Stack>
  );
}
