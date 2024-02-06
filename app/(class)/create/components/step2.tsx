import {
  Button,
  Center,
  Collapse,
  Highlight,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { useRecoilState } from "recoil";
import { IoMdRemove } from "react-icons/io";
import { classInfoState } from "@/state/classInfoState";
import { StudentInfo } from "@/utils/types";
import { CiCircleQuestion } from "react-icons/ci";
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
  const [isNoteOpen, setIsNoteOpen] = useState(true);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setIsNoteOpen(false);
    }, 20000);

    return () => {
      clearInterval(timer);
    };
  }, [isNoteOpen]);

  useEffect(() => {
    setIsNoteOpen(true);
  }, []);

  return (
    <Stack paddingBottom="2rem" w={{ base: "100%", sm: "30rem" }}>
      <Center w="100%" justifyContent="end">
        <IconButton
          variant={isNoteOpen ? "solid" : "outline"}
          aria-label="Note"
          fontSize="1.5rem"
          icon={<CiCircleQuestion />}
          onClick={() => setIsNoteOpen((prev) => !prev)}
        />
      </Center>
      <Collapse in={isNoteOpen}>
        <Stack
          borderRadius="1rem"
          bg="palette.light"
          spacing="1rem"
          p="1rem"
          marginBottom="1rem"
        >
          <Text fontSize=".8rem" opacity={0.65}>
            <Highlight
              query={["NOTE:", "firstName", "middleName", "lastName"]}
              styles={{ fontWeight: "bold" }}
            >
              NOTE: When uploading CSV file for students, make sure that the
              columns are labeled firstName, middleName, lastName.
            </Highlight>
          </Text>
          <Button
            as="a"
            target="+black"
            download="sample.csv"
            href="/samplecsv/sample.csv"
            leftIcon={<AiOutlineDownload />}
            variant="link"
            fontSize=".8rem"
            w="fit-content"
            minW="fit-content"
            color="palette.button.primary"
          >
            Download Sample
          </Button>
        </Stack>
      </Collapse>
      <Stack>
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
      </Stack>
      <Stack spacing=".8rem" pt="1rem">
        <UploadCSV />
        <Button
          borderRadius=".8rem"
          w="100%"
          h="3.5rem"
          fontSize=".9rem"
          bg="palette.light"
          color="palette.accent"
          boxShadow="none"
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
