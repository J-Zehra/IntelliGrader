import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { FetchedTestInfo } from "@/utils/types";
import { gradeState } from "@/state/gradeState";

export default function useGrade(answerIndices: number[], testId: string) {
  const setGrade = useSetRecoilState(gradeState);
  const getTest = async () => {
    let test: Partial<FetchedTestInfo> = {};
    await axios.get(`/api/tests/${testId}`).then((res) => {
      test = res.data;
    });

    return test;
  };

  const { data } = useQuery({ queryKey: ["test"], queryFn: getTest });

  useEffect(() => {
    if (data?.answerIndices) {
      const result: number[] = [];
      let correctAnswer: number = 0;
      let incorrectAnswer: number = 0;
      data.answerIndices.forEach((answer, index) => {
        if (answer === answerIndices[index]) {
          correctAnswer += 1;
          result.push(0);
        } else {
          incorrectAnswer += 1;
          result.push(1);
        }
      });

      setGrade({
        gradedAnswerIndices: result,
        totalNumberOfCorrect: correctAnswer,
        totalNumberOfWrong: incorrectAnswer,
        totalQuestions: data.answerIndices.length,
      });
    }
  }, [answerIndices, data, setGrade]);
}
