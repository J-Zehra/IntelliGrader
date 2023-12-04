/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-prototype-builtins */
import { Button } from "@chakra-ui/react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { MdOutlineFileUpload } from "react-icons/md";
import { useCSVReader } from "react-papaparse";
import { FetchedStudentInfo } from "@/utils/types";

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

export default function UploadCSV({
  refetch,
}: {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<FetchedStudentInfo[], unknown>>;
}) {
  const { CSVReader } = useCSVReader();
  const { class_id } = useParams();

  const addStudents = (data: { students: StudentName[]; classId: string }) => {
    return axios.post("/api/add_students", data);
  };

  const mutateStudents = useMutation({
    mutationFn: addStudents,
    mutationKey: ["add-students"],
    onSuccess: () => {
      refetch();
      console.log("Success");
    },
  });

  const handleAcceeptedFile = (results: any) => {
    const transformedData = transformData(results.data);
    const data = {
      students: transformedData,
      classId: class_id as string,
    };

    mutateStudents.mutate(data);
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
          w="fit-content"
          fontSize=".7rem"
          p=".5rem .8rem"
          bg="transparent"
          border="1px solid"
          borderColor="palette.accent"
          color="palette.accent"
          boxShadow="none"
          isLoading={mutateStudents.isLoading}
          leftIcon={<MdOutlineFileUpload style={{ fontSize: "1rem" }} />}
        >
          Upload CSV
        </Button>
      )}
    </CSVReader>
  );
}
