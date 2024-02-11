/* eslint-disable react/jsx-props-no-spreading */
import { Button, useToast } from "@chakra-ui/react";
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
      let hasRequiredFields = false; // Flag to check if required fields are present

      row.forEach((value: string, index: number) => {
        // Use attributes from the first row as keys
        obj[attributes[index]] = value;

        // Check if firstName and lastName are present
        if (
          attributes[index] === "firstName" &&
          value.trim() !== "" &&
          attributes.includes("lastName") &&
          row[attributes.indexOf("lastName")].trim() !== ""
        ) {
          hasRequiredFields = true;
        }
      });

      // If required fields are not present, return null
      if (!hasRequiredFields) {
        return null;
      }

      return obj;
    })
    .filter(Boolean); // Filter out null values

  return objectsArray as unknown as StudentName[];
};

export default function UploadCSV() {
  const setClassInfo = useSetRecoilState(classInfoState);
  const { CSVReader } = useCSVReader();
  const toast = useToast();

  const handleAcceeptedFile = (results: any) => {
    const transformedData = transformData(results.data);

    if (transformedData.length < 1) {
      toast({
        title: "Invalid CSV Format",
        description: "Please follow the format for the CSV file",
        status: "error",
        position: "top",
        duration: 5000,
      });
      return;
    }

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
          fontSize=".9rem"
          borderRadius=".8rem"
          leftIcon={<MdOutlineFileUpload />}
        >
          Upload CSV
        </Button>
      )}
    </CSVReader>
  );
}
