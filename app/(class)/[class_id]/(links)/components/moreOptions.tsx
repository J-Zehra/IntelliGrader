import { Center, useToast } from "@chakra-ui/react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import Lottie from "react-lottie-player";
import { FetchedTestInfo } from "@/utils/types";
import loadingAnimation from "../../../../../public/signing_up.json";

export default function MoreOptions({
  id,
  refetch,
}: {
  id: string;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<FetchedTestInfo[], unknown>>;
}) {
  const toast = useToast();

  const deleteTest = (testId: string) => {
    return axios.delete(`/api/delete_test/${testId}`);
  };

  const mutateTest = useMutation({
    mutationFn: deleteTest,
    mutationKey: ["delete-test", id],
    onSuccess: () => {
      refetch();
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
