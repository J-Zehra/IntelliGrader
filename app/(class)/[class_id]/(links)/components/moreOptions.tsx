import { Center, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import Lottie from "react-lottie-player";
import loadingAnimation from "../../../../../public/signing_up.json";

export default function MoreOptions({ id }: { id: string }) {
  const toast = useToast();

  const deleteTest = (testId: string) => {
    return axios.delete(`/api/delete_test/${testId}`);
  };

  const mutateTest = useMutation({
    mutationFn: deleteTest,
    mutationKey: ["delete-test", id],
    onSuccess: () => {
      toast({
        title: "Success",
        status: "success",
        duration: 3000,
      });
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
    <Center zIndex={10} onClick={handleDeleteTest}>
      <FaDeleteLeft />
    </Center>
  );
}
