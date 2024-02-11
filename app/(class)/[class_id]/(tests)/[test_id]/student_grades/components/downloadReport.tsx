/* eslint-disable @typescript-eslint/naming-convention */
import { FetchedTestInfo } from "@/utils/types";
import { Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useParams } from "next/navigation";
import React from "react";
import { utils, writeFile } from "xlsx-js-style";

type StudentGrade = {
  student: string;
  status: string;
  answerIndices: number[];
};

type ClassOverview = {
  course: string;
  program: string;
  totalStudents: number;
  totalTests: number;
  totalTestsCompleted: number;
};

export default function DownloadReport() {
  const { test_id, class_id } = useParams();

  const { data: classData, isLoading: isClassLoading } =
    useQuery<ClassOverview>({
      queryKey: ["class"],
      queryFn: async () => {
        const res = await fetch(`/api/class/${class_id}`, {
          method: "GET",
        });
        const classes = res.json();

        return classes;
      },
    });

  const getTest = async () => {
    let grade: Partial<FetchedTestInfo> = {};
    await axios.get(`/api/tests/${test_id}`).then((res) => {
      grade = res.data;
    });

    return grade;
  };

  const { data: test, isLoading: isTestLoading } = useQuery({
    queryKey: ["test-info", test_id],
    queryFn: getTest,
  });

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

  const result: unknown[][] = (testInfo?.studentGrades?.map((grade) => {
    const data: unknown[] = [];

    const name = {
      v: grade.student,
      t: "s",
    };

    data.push(name); // Push name to data for the current iteration
    let totalCount = 0;
    grade.answerIndices.forEach((item) => {
      if (item === 1) {
        totalCount += 1;
      }
    });

    const total = { v: totalCount, t: "s" };
    data.push(total);

    const status = {
      v: grade.status,
      t: "s",
      s: {
        font: {
          color: {
            rgb: grade.status === "Passed" ? "259358" : "CB3535",
          },
        },
      },
    };
    data.push(status);

    return data;
  }) || []) as unknown[][];

  if (result) {
    // ADD HEADER
    const headerData: unknown[] = [];
    const headerName = {
      v: "STUDENT NAME",
      t: "s",
      s: { font: { bold: true }, fill: { fgColor: { rgb: "A799FD" } } },
    };
    headerData.push(headerName);

    const totalHeader = {
      v: " Score",
      t: "s",
      s: { font: { bold: true }, fill: { fgColor: { rgb: "A799FD" } } },
    };
    headerData.push(totalHeader);

    const statusHeader = {
      v: "Status",
      t: "s",
      s: { font: { bold: true }, fill: { fgColor: { rgb: "A799FD" } } },
    };
    headerData.push(statusHeader);

    // TEST INFO
    const courseName = [
      {
        v: "Course",
        t: "s",
        s: { font: { bold: true } },
      },
      {
        v: classData?.course,
        t: "s",
        s: { font: { bold: true, color: { rgb: "7E6CEA" } } },
      },
    ];
    const programName = [
      {
        v: "Program",
        t: "s",
        s: { font: { bold: true } },
      },
      {
        v: classData?.program,
        t: "s",
        s: { font: { bold: true, color: { rgb: "7E6CEA" } } },
      },
    ];
    const testName = [
      {
        v: "Test Name",
        t: "s",
        s: { font: { bold: true } },
      },
      {
        v: test?.testName,
        t: "s",
        s: { font: { bold: true, color: { rgb: "7E6CEA" } } },
      },
    ];
    const totalItems = [
      { v: "Total Items", t: "s", s: { font: { bold: true } } },
      {
        v: testInfo?.tally?.length,
        t: "s",
        s: { font: { bold: true, color: { rgb: "7E6CEA" } } },
      },
    ];
    const passingGrade = [
      { v: "Passing Grade", t: "s", s: { font: { bold: true } } },
      {
        v: `${test?.passingGrade}%`,
        t: "s",
        s: { font: { bold: true, color: { rgb: "7E6CEA" } } },
      },
    ];
    const dateCreated = [
      {
        v: "Data Created",
        t: "s",
        s: { font: { bold: true } },
      },
      {
        v: moment(test?.createdAt).format("MMM Do YYYY"),
        t: "s",
        s: { font: { bold: true, color: { rgb: "7E6CEA" } } },
      },
    ];

    result.unshift(headerData);
    result.unshift([]);
    result.unshift(dateCreated);
    result.unshift(passingGrade);
    result.unshift(totalItems);
    result.unshift(testName);
    result.unshift(courseName);
    result.unshift(programName);
  }

  const handleDownload = (data: unknown[][]) => {
    const ws = utils.aoa_to_sheet(data);
    ws["!cols"] = [{ wch: 25 }];
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");

    // Save the file
    const fileName = `${classData?.program}_${test?.testName}_Report.xlsx`;
    writeFile(wb, fileName);
  };

  if (isLoading || isTestLoading || isClassLoading) {
    return (
      <Button w="100%" isLoading>
        Download Report
      </Button>
    );
  }

  return (
    <Button
      w="100%"
      fontSize=".9rem"
      boxShadow="none"
      onClick={() => handleDownload(result)}
    >
      Download Report
    </Button>
  );
}
