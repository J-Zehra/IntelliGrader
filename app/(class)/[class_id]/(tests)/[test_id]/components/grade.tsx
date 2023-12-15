/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button } from "@chakra-ui/react";
import React from "react";
import { AiOutlineScan } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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

    async function scaleImage(image: File, targetWidth: number) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const targetHeight = targetWidth / aspectRatio;

          const canvas = document.createElement("canvas");
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          const ctx = canvas.getContext("2d");
          ctx!.drawImage(img, 0, 0, targetWidth, targetHeight);

          canvas.toBlob((blob) => {
            resolve(blob);
          }, "image/jpeg"); // You can change the format as needed
        };
        img.src = URL.createObjectURL(image);
      });
    }

    async function compressAndScaleImages() {
      const scalingPromises = files.map(async (file) => {
        const { image } = file;
        const scaledImage = await scaleImage(image!, 600);

        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            resolve(dataUrl);
          };
          reader.readAsDataURL(scaledImage as Blob);
        });
      });

      const scaledImages = await Promise.all(scalingPromises);

      const numberOfChoices = testData!.testParts!.map(
        (part) => part.numberOfChoices || 0,
      );

      const data = {
        images: scaledImages,
        answer: testData!.answerIndices,
        numberOfChoices,
      };
      return data;
    }

    compressAndScaleImages().then((data) => {
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
