/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineScan } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { FetchedTestInfoToProcess } from "@/utils/types";
import { fileState } from "@/state/fileState";
import { localGradeInfo } from "@/state/localGradeInfo";
import imageCompression, { Options } from "browser-image-compression";
import { failedToScan } from "@/state/failedToScan";
import { socket } from "../socket";

export default function GradeButton({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { test_id } = useParams();
  const navigate = useRouter();
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useRecoilState(fileState);
  const setLocalGradeInfo = useSetRecoilState(localGradeInfo);
  const setFailedScan = useSetRecoilState(failedToScan);

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

    async function compressAndScaleImages() {
      const scalingPromises = files.map(async (file) => {
        const { image } = file;

        const options: Options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 960,
          useWebWorker: true,
        };

        try {
          const compressedImage = await imageCompression(image!, options);

          const convertBlobToBase64 = (blob: Blob) => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result);
              };
              reader.readAsDataURL(blob);
            });
          };

          const base64String = await convertBlobToBase64(compressedImage);

          return base64String;
        } catch (error) {
          console.error("Error compressing image:", error);
          return null;
        }
      });

      const scaledImages = await Promise.all(scalingPromises);

      const parts = testData!.testParts!.map((part) => {
        return {
          numberOfChoices: part.numberOfChoices || 0,
          points: part.points || 0,
          totalNumber: part.totalNumber || 0,
        };
      });

      const data = {
        images: scaledImages,
        answer: testData!.answerIndices,
        parts,
      };
      return data;
    }

    compressAndScaleImages().then((data) => {
      socket.emit("grade", data);
      socket.on("grade_result", (d) => {
        if (d.length === 1 && d[0].status === "error") {
          setErrorMessage(d[0].message);
          setLoading(false);
          return;
        }

        const success = d.filter((item: any) => item.status === "success");

        const failed = d.filter((item: any) => item.status === "failed");

        setLocalGradeInfo(success);
        setFailedScan(failed);
        setFiles([]);
        navigate.push("local_student_grades");
      });
    });
  };

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: "Error",
        description: errorMessage,
        position: "bottom",
        status: "error",
        duration: 3000,
      });
    }
  }, [errorMessage, toast]);

  return (
    <Button leftIcon={<AiOutlineScan />} onClick={handleSubmit}>
      Grade
    </Button>
  );
}
