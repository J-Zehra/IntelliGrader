import axios from "axios";
import { queryClient } from "@/components/wrappers/queryWrapper";
import { FetchedStudentInfo, FetchedTestInfo } from "@/utils/types";

export const prefetchTests = async (id: string) => {
  await queryClient.prefetchQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      let tests: FetchedTestInfo[] = [];
      await axios.get(`/api/tests/class_tests/${id}`).then((res) => {
        tests = res.data;
      });

      return tests;
    },
  });
};

export const prefetchStudents = async (id: string) => {
  const getStudents = async () => {
    let data: FetchedStudentInfo[] = [];
    await axios.get(`/api/students/${id}`).then((res) => {
      data = res.data;
    });

    return data;
  };

  await queryClient.prefetchQuery({
    queryKey: ["students", id],
    queryFn: getStudents,
  });
};
