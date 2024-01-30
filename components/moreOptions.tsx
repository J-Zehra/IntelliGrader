import { Center, useDisclosure } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import Lottie from "react-lottie-player";
import loadingAnimation from "../public/signing_up.json";
import { queryClient } from "./wrappers/queryWrapper";
import ConfirmationModal from "./confirmationModal";

export default function MoreOptions({ id }: { id: string }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const deleteClass = (classId: string) => {
    return axios.delete(`/api/delete_class/${classId}`);
  };

  const mutateTest = useMutation({
    mutationFn: deleteClass,
    mutationKey: ["delete-class", id],
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["classes"], (oldData) => {
        const newData = (oldData as any[]).filter(
          (item) => item.id !== data.id,
        );
        return newData;
      });
      onClose();
    },
  });

  const handleDeleteClass = () => {
    mutateTest.mutate(id);
  };

  if (mutateTest.isLoading) {
    return (
      <Lottie
        loop
        animationData={loadingAnimation}
        play
        style={{ width: 30, height: 30 }}
      />
    );
  }

  return (
    <>
      {isOpen ? (
        <ConfirmationModal
          handleDeleteClass={handleDeleteClass}
          isOpen={isOpen}
          onClose={onClose}
        />
      ) : null}
      <Center zIndex={10} onClick={onOpen}>
        <FaDeleteLeft />
      </Center>
    </>
  );
}
