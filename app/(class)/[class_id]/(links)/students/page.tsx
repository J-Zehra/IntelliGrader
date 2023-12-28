"use client";

/* eslint-disable @typescript-eslint/naming-convention */
import {
  Center,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { ClassNavLink, FetchedStudentInfo } from "@/utils/types";
import { queryClient } from "@/components/wrappers/queryWrapper";
import useObserver from "@/hooks/useObserver";
import AddStudentModal from "./components/addStudentsModal";
import Loading from "./components/loading";
import EditStudentModal from "./components/editStudentModal";
import UploadCSV from "./components/uploadCSV";

export default function StudentsPage() {
  const { ref } = useObserver(ClassNavLink.students);
  const { class_id } = useParams();
  const toast = useToast();
  const [studentId, setStudentId] = useState<string>("");
  const [selectedStudentToEdit, setSelectedStudentToEdit] =
    useState<FetchedStudentInfo>({
      firstName: "",
      middleName: "",
      lastName: "",
      rollNumber: 0,
      id: "",
    });

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

  const getStudents = async () => {
    let data: FetchedStudentInfo[] = [];
    await axios.get(`/api/students/${class_id}`).then((res) => {
      data = res.data;
    });

    return data;
  };

  const deleteTest = (id: string) => {
    return axios.delete(`/api/delete_student/${id}`);
  };

  const {
    data: students,
    isLoading,
    refetch,
  } = useQuery<FetchedStudentInfo[]>({
    queryKey: ["students", class_id],
    queryFn: getStudents,
  });

  const mutateStudent = useMutation({
    mutationFn: deleteTest,
    mutationKey: ["delete-student"],
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["students", class_id], (oldData) => {
        const newData = (oldData as FetchedStudentInfo[]).filter(
          (student) => student.id !== data.id,
        );
        return newData;
      });

      toast({
        title: "Success",
        status: "success",
        duration: 3000,
      });
    },
  });

  const handleRemove = (id: string) => {
    setStudentId(id);
    mutateStudent.mutate(id);
  };

  const handleEdit = (student: FetchedStudentInfo) => {
    setSelectedStudentToEdit(student);
    onEditModalOpen();
  };

  console.log("Students", students);

  return (
    <Stack ref={ref}>
      <Stack
        direction="row"
        w="100%"
        justify="space-between"
        align="center"
        paddingBottom="1rem"
        paddingTop="1rem"
      >
        <Text fontSize=".8rem" opacity={0.8}>
          {students?.length} total students
        </Text>
        <Stack direction="row" align="center">
          <UploadCSV refetch={refetch} />
          <IconButton
            aria-label="Edit"
            onClick={onAddModalOpen}
            icon={<IoMdAdd style={{ fontSize: "1rem" }} />}
          />
        </Stack>
      </Stack>
      {isLoading ? (
        <Loading />
      ) : (
        students?.map((student) => {
          return (
            <Stack
              key={student.rollNumber}
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
                isLoading={mutateStudent.isLoading && studentId === student.id}
                onClick={() => handleRemove(student.id)}
                icon={<IoMdRemove />}
              />
            </Stack>
          );
        })
      )}
      {isAddModalopen ? (
        <AddStudentModal
          classId={class_id as string}
          lastRollNumber={
            students!.length > 0
              ? students![students!.length - 1].rollNumber
              : 0
          }
          isOpen={isAddModalopen}
          onClose={onAddModalClose}
        />
      ) : null}
      {isEditModalOpen ? (
        <EditStudentModal
          student={selectedStudentToEdit}
          isOpen={isEditModalOpen}
          onClose={onEditModalClose}
        />
      ) : null}
    </Stack>
  );
}
