/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button } from "@chakra-ui/react";
import React from "react";
import { AiOutlineScan } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import imageCompression, { Options } from "browser-image-compression";
import { useRecoilState, useSetRecoilState } from "recoil";
import { FetchedTestInfoToProcess } from "@/utils/types";
import { fileState } from "@/state/fileState";
import { localGradeInfo } from "@/state/localGradeInfo";
import { socket } from "../socket";

export default function GradeButton({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { test_id } = useParams();
  const navigate = useRouter();
  const [files, setFiles] = useRecoilState(fileState);
  const setLocalGradeInfo = useSetRecoilState(localGradeInfo);

  const getTest = async () => {
    let test: Partial<FetchedTestInfoToProcess> = {};
    await axios.get(`/api/tests/${test_id}`).then((res) => {
      test = res.data;
    });

    return test;
  };

  const { data: testData } = useQuery({ queryKey: ["test"], queryFn: getTest });

  const handleSubmit = async () => {
    if (!files || !testData) {
      console.log("No File");
      return;
    }

    setLoading(true);
    const options: Options = {
      maxSizeMB: 0.5,
      useWebWorker: true,
      maxWidthOrHeight: 850,
    };

    async function compressAndAppendImages() {
      const compressionPromises = files.map(async (file) => {
        const { image } = file;
        const compressedFile = await imageCompression(image!, options);

        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            resolve(dataUrl);
          };
          reader.readAsDataURL(compressedFile!);
        });
      });

      const images = await Promise.all(compressionPromises);

      const numberOfChoices = testData!.testParts!.map(
        (part) => part.numberOfChoices || 0,
      );

      const data = {
        images,
        answer: testData!.answerIndices,
        numberOfChoices,
      };
      return data;
    }

    compressAndAppendImages().then((data) => {
      socket.emit("grade", data);
      socket.on("grade_result", (d) => {
        console.log(d);
        setLocalGradeInfo(d);
        setFiles([]);
        navigate.push("local_student_grades");
        // mutateStudentGrade.mutate(d);
      });
    });
  };

  return (
    <Button leftIcon={<AiOutlineScan />} onClick={handleSubmit}>
      Grade
    </Button>
  );
}
