import axios from "axios";
import { StudentGrade } from "@prisma/client";
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

export const prefetchTally = async (id: string) => {
  const getTally = async () => {
    const data = { testId: IDBCursorWithValue };
    let responseData: Partial<{
      tally: number[];
      totalStudents: number;
      studentGrades: StudentGrade[];
    }> = {};
    await axios.get("/api/tally", { params: data }).then((res) => {
      const { tally, totalStudents, studentGrades } = res.data;
      responseData = { tally, totalStudents, studentGrades };
    });

    return responseData;
  };

  queryClient.prefetchQuery({
    queryKey: ["tally", id],
    queryFn: getTally,
  });
};
