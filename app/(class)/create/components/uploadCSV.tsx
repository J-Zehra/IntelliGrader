/* eslint-disable react/jsx-props-no-spreading */
import { Button } from "@chakra-ui/react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useCSVReader } from "react-papaparse";
import { useSetRecoilState } from "recoil";
import { classInfoState } from "@/state/classInfoState";

type StudentName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

const isRowEmpty = (row: any[]) => row.every((value) => value === "");

const transformData = (data: any[]) => {
  if (data.length < 2) {
    // Not enough rows to transform
    return [];
  }

  const attributes = data[0];
  const objectsArray = data
    .slice(1)
    .filter((row) => !isRowEmpty(row))
    .map((row) => {
      const obj: Record<string, any> = {};
      row.forEach((value: string, index: number) => {
        // Use attributes from the first row as keys
        obj[attributes[index]] = value;
      });
      return obj;
    });

  return objectsArray as unknown as StudentName[];
};

export default function UploadCSV() {
  const setClassInfo = useSetRecoilState(classInfoState);
  const { CSVReader } = useCSVReader();

  const handleAcceeptedFile = (results: any) => {
    const transformedData = transformData(results.data);

    transformedData.forEach((student, index) => {
      setClassInfo((prev) => ({
        ...prev,
        students: [
          ...prev.students,
          {
            ...student,
            rollNumber:
              prev.students.length === 0 ? index + 1 : prev.students.length + 1,
          },
        ],
      }));
    });
  };
  return (
    <CSVReader
      noDrag
      onUploadAccepted={(results: any) => handleAcceeptedFile(results)}
      skipEmptyLines
    >
      {({ getRootProps }: any) => (
        <Button
          {...getRootProps()}
          w="100%"
          bg="transparent"
          border="1px solid"
          borderColor="palette.light"
          color="palette.button.primary"
          boxShadow="none"
          h="3.5rem"
          borderRadius=".8rem"
          leftIcon={<MdOutlineFileUpload />}
        >
          Upload CSV
        </Button>
      )}
    </CSVReader>
  );
}
