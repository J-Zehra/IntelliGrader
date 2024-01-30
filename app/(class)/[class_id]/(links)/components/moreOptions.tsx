import { Center, useDisclosure } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import Lottie from "react-lottie-player";
import { queryClient } from "@/components/wrappers/queryWrapper";
import loadingAnimation from "../../../../../public/signing_up.json";
import ConfirmationModal from "./confirmationModa";

export default function MoreOptions({ id }: { id: string }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const deleteTest = (testId: string) => {
    return axios.delete(`/api/delete_test/${testId}`);
  };

  const mutateTest = useMutation({
    mutationFn: deleteTest,
    mutationKey: ["delete-test", id],
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["tests"], (oldData) => {
        const newData = (oldData as any[]).filter(
          (item) => item.id !== data.id,
        );
        return newData;
      });
      onClose();
    },
  });

  const handleDeleteTest = () => {
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
          handleDeleteTest={handleDeleteTest}
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
