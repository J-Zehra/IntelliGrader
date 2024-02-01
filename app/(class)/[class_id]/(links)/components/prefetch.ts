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

export const prefetchStatistics = async (id: string) => {
  const getStatistics = async () => {
    let grade: Partial<
      { accuracy: number; studentName: string; id: string }[]
    > = [];
    await axios.get(`/api/ranking/${id}`).then((res) => {
      grade = res.data;
    });

    return grade;
  };

  await queryClient.prefetchQuery({
    queryKey: ["class-ranking", id],
    queryFn: getStatistics,
  });
};

export const prefetchPassingRateDistribution = async (id: string) => {
  const getPassingRates = async () => {
    let grade: Partial<{ testName: string; passingRate: number }[]> = [];
    await axios
      .get(`/api/class_passing_rate_distribution/${id}`)
      .then((res) => {
        grade = res.data;
      });

    return grade;
  };

  await queryClient.prefetchQuery({
    queryKey: ["passing-rate-distribution", id],
    queryFn: getPassingRates,
  });
};

export const prefetchClassRanking = async (id: string) => {
  const getClassRanking = async () => {
    let grade: Partial<
      { accuracy: number; studentName: string; id: string }[]
    > = [];
    await axios.get(`/api/ranking/${id}`).then((res) => {
      grade = res.data;
    });

    return grade;
  };

  await queryClient.prefetchQuery({
    queryKey: ["class-ranking", id],
    queryFn: getClassRanking,
  });
};
