import axios from "axios";
import { queryClient } from "@/components/wrappers/queryWrapper";
import { Grade, Statistics } from "@/utils/types";

export const prefetchStudentGrades = async (id: string) => {
  const getStudentGrades = async () => {
    let studentGrade: Grade[] = [];
    await axios.get(`/api/student_grades/${id}`).then((res) => {
      studentGrade = res.data;
    });

    return studentGrade;
  };

  await queryClient.prefetchQuery({
    queryFn: getStudentGrades,
    queryKey: ["get-student-grades", id],
  });
};

export const prefetchStatistics = async (id: string) => {
  const getStatistics = async () => {
    const data = { testId: id };
    let grade: Partial<Statistics> = {};
    await axios.get("/api/statistics", { params: data }).then((res) => {
      grade = res.data;
    });

    return grade;
  };

  await queryClient.prefetchQuery({
    queryKey: ["grade-statistics", id],
    queryFn: getStatistics,
  });
};
