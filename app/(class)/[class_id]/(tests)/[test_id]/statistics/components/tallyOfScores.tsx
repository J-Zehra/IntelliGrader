/* eslint-disable @typescript-eslint/naming-convention */
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";
import { CiCircleCheck, CiPercent, CiSquareRemove } from "react-icons/ci";

type StudentGrade = {
  student: string;
  answerIndices: number[];
};

export default function TallyOfScores() {
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

  const { data: testInfo } = useQuery({
    queryKey: ["tally", test_id],
    queryFn: getStatistics,
  });

  return (
    <TableContainer>
      <Table variant="simple" fontFamily="inter">
        <Thead bg="palette.light">
          <Tr>
            <Th color="palette.button.primary">#</Th>
            <Th color="palette.button.primary" fontSize="1.5rem">
              <CiCircleCheck />
            </Th>
            <Th color="palette.button.primary" fontSize="1.5rem">
              <CiSquareRemove />
            </Th>
            <Th color="palette.button.primary" fontSize="1.5rem">
              <CiPercent />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {testInfo?.tally?.map((score, index) => {
            return (
              <Tr>
                <Td fontSize=".8rem" opacity={0.7}>
                  {index + 1}
                </Td>
                <Td p=" 1rem 2rem">{score}</Td>
                <Td p=" 1rem 2rem">{testInfo.totalStudents! - score}</Td>
                <Td p=" 1rem 1.5rem">
                  {Math.round((score / testInfo.totalStudents!) * 100)}%
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th color="palette.button.primary">#</Th>
            <Th color="palette.button.primary" fontSize="1.5rem">
              <CiCircleCheck />
            </Th>
            <Th color="palette.button.primary" fontSize="1.5rem">
              <CiSquareRemove />
            </Th>
            <Th color="palette.button.primary" fontSize="1.5rem">
              <CiPercent />
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
