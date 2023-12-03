/* eslint-disable @typescript-eslint/naming-convention */
import { Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";
import { useCSVDownloader } from "react-papaparse";

type StudentGrade = {
  student: string;
  answerIndices: number[];
};

export default function DownloadReport() {
  const { CSVDownloader } = useCSVDownloader();

  const { test_id } = useParams();

  const getStatistics = async () => {
    const data = { testId: test_id };
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

  const { data: testInfo, isLoading } = useQuery({
    queryKey: ["tally", test_id],
    queryFn: getStatistics,
  });

  console.log(testInfo);

  const result = testInfo?.studentGrades?.map((grade) => {
    const resultObj: any = { Name: grade.student };

    grade.answerIndices.forEach((answer, index) => {
      resultObj[`Q${index + 1}`] = answer;
    });

    return resultObj;
  });

  const tallyObject: any = { Name: "" };
  if (testInfo) {
    testInfo.tally!.forEach((count, index) => {
      tallyObject[`Q${index + 1}`] = count; // Assuming indices start from 1
    });
  }

  if (result) {
    result.push(tallyObject);
  }

  if (isLoading) {
    return (
      <Button w="100%" isLoading>
        Download Full Report
      </Button>
    );
  }

  return (
    <CSVDownloader filename="Report" data={result}>
      <Button w="100%">Download Full Report</Button>
    </CSVDownloader>
  );
}
