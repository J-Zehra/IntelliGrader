/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { AiOutlineScan } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import imageCompression, { Options } from "browser-image-compression";
import { useRecoilValue } from "recoil";
import { FetchedGradeInfo, FetchedTestInfoToProcess } from "@/utils/types";
import { fileState } from "@/state/fileState";

export default function GradeButton({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const toast = useToast();
  const { test_id } = useParams();
  const navigate = useRouter();
  const files = useRecoilValue(fileState);

  const getTest = async () => {
    let test: Partial<FetchedTestInfoToProcess> = {};
    await axios.get(`/api/tests/${test_id}`).then((res) => {
      test = res.data;
    });

    return test;
  };

  const { data: testData } = useQuery({ queryKey: ["test"], queryFn: getTest });

  const createStudentGrade = (grades: FetchedGradeInfo[]) => {
    const data = { testId: test_id, grades };
    return axios.post("/api/create_student_grade", data);
  };

  const mutateStudentGrade = useMutation({
    mutationFn: createStudentGrade,
    mutationKey: ["create-student-grade", test_id],
    onSuccess: () => {
      setLoading(false);

      toast({
        title: "Success",
        status: "success",
        duration: 3000,
      });

      navigate.push("student_grades");
    },
  });

  const handleSubmit = async () => {
    if (!files || !testData) {
      console.log("No File");
      return;
    }

    setLoading(true);
    const options: Options = {
      maxSizeMB: 1,
      useWebWorker: true,
      maxWidthOrHeight: 850,
    };

    async function compressAndAppendImages() {
      const formData = new FormData();
      for (let index = 0; index < files.length; index += 1) {
        const { image } = files[index];
        const compressedFile = await imageCompression(image!, options);
        formData.append("images", compressedFile);
      }

      formData.append("answer", JSON.stringify(testData!.answerIndices));

      const numberOfChoices = testData!.testParts!.map(
        (part) => part.numberOfChoices || 0,
      );

      formData.append("numberOfChoices", JSON.stringify(numberOfChoices));
      return formData;
    }

    compressAndAppendImages().then((formData) => {
      axios
        .post(
          "https://intelli-grader-backend-43b270ab373f.herokuapp.com/process",
          formData,
        )
        .then((res) => {
          const { data } = res;
          console.log(data);

          // STORE IN DATABASE
          mutateStudentGrade.mutate(data);
        })
        .catch((err) => {
          setLoading(false);
          toast({
            title: err.response.data.error,
            description: "Please take a clear picture",
            status: "error",
            duration: 10000,
          });

          console.log(err);
        });
    });
  };

  return (
    <Button leftIcon={<AiOutlineScan />} onClick={handleSubmit}>
      Grade
    </Button>
  );
}
