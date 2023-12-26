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
      const question = { v: item, t: "s" };
      data.push(question); // Push each question to data
    });

    const total = { v: totalCount, t: "s" };
    data.push(total);

    return data;
  }) || []) as unknown[][];

  if (result) {
    // ADD TALLY
    const tallyData: unknown[] = [];
    const tallyName = {
      v: "TOTAL",
      t: "s",
      s: { font: { bold: true }, fill: { fgColor: { rgb: "D5D5D5" } } },
    };
    tallyData.push(tallyName);
    let totalCount = 0;
    testInfo?.tally?.forEach((item) => {
      totalCount += item;
      const tally = {
        v: item,
        t: "s",
        s: { font: { bold: true }, fill: { fgColor: { rgb: "D5D5D5" } } },
      };
      tallyData.push(tally);
    });

    const tallyTotal = {
      v: totalCount,
      t: "s",
      s: { font: { bold: true }, fill: { fgColor: { rgb: "D5D5D5" } } },
    };
    tallyData.push(tallyTotal);

    // ADD HEADER
    const headerData: unknown[] = [];
    const headerName = {
      v: "STUDENT NAME",
      t: "s",
      s: { font: { bold: true }, fill: { fgColor: { rgb: "18C1AD" } } },
    };
    headerData.push(headerName);
    [...Array(testInfo?.tally?.length)].forEach((_, index) => {
      const header = {
        v: `Q${index + 1}`,
        t: "s",
        s: { font: { bold: true }, fill: { fgColor: { rgb: "18C1AD" } } },
      };
      headerData.push(header);
    });

    const totalHeader = {
      v: "Total",
      t: "s",
      s: { font: { bold: true }, fill: { fgColor: { rgb: "18C1AD" } } },
    };
    headerData.push(totalHeader);

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
        s: { font: { bold: true, color: { rgb: "168F81" } } },
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
        s: { font: { bold: true, color: { rgb: "168F81" } } },
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
        s: { font: { bold: true, color: { rgb: "168F81" } } },
      },
    ];
    const totalItems = [
      { v: "Total Items", t: "s", s: { font: { bold: true } } },
      {
        v: testInfo?.tally?.length,
        t: "s",
        s: { font: { bold: true, color: { rgb: "168F81" } } },
      },
    ];
    const passingGrade = [
      { v: "Passing Grade", t: "s", s: { font: { bold: true } } },
      {
        v: `${test?.passingGrade}%`,
        t: "s",
        s: { font: { bold: true, color: { rgb: "168F81" } } },
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
        s: { font: { bold: true, color: { rgb: "168F81" } } },
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
    result.push(tallyData);
  }

  console.log(result);

  const handleDownload = (data: unknown[][]) => {
    const ws = utils.aoa_to_sheet(data);
    ws["!cols"] = [{ wch: 25 }];
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");

    // Save the file
    const fileName = "example.xlsx";
    writeFile(wb, fileName);
  };

  if (isLoading || isTestLoading || isClassLoading) {
    return (
      <Button w="100%" isLoading>
        Download Full Report
      </Button>
    );
  }

  return (
    <Button w="100%" onClick={() => handleDownload(result)}>
      Download Full Report
    </Button>
  );
}
