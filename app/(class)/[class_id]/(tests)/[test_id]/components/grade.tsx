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
// import { socket } from "../socket";

export default function GradeButton({
  setLoading,
  isLoading,
}: {
  isLoading: boolean;
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

          const convertBlobToUint8Array = (blob: Blob) => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const arrayBuffer = reader.result;
                const uint8Array = new Uint8Array(
                  arrayBuffer as ArrayBufferLike,
                );
                resolve(uint8Array);
              };
              reader.readAsArrayBuffer(blob);
            });
          };

          const binaryString = await convertBlobToUint8Array(compressedImage);

          return binaryString;
        } catch (error) {
          console.error("Error compressing image:", error);
          return null;
        }
      });

      const scaledImages = await Promise.all(scalingPromises);
      console.log(scaledImages);

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

    try {
      const data = await compressAndScaleImages();
      socket.emit("grade", data);
    } catch (error) {
      console.error("Error compressing and scaling images:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: "Error",
        description: errorMessage,
        position: "top",
        status: "error",
        duration: 3000,
      });

      setErrorMessage("");
    }
  }, [errorMessage, toast]);

  useEffect(() => {
    const onGradeEvent = (data: any) => {
      if (data.length === 1 && data[0].status === "failed") {
        setErrorMessage(data[0].message);
        setLoading(false);
        return;
      }

      const sorted = data.sort(
        (a: any, b: any) => b.number_of_correct - a.number_of_correct,
      );

      const success = sorted.filter((item: any) => item.status === "success");
      const failed = sorted.filter((item: any) => item.status === "failed");

      setLocalGradeInfo(success);
      setFailedScan(failed);
      setFiles([]);
      navigate.push("local_student_grades");
    };

    socket.on("grade_result", onGradeEvent);

    return () => {
      socket.off("grade_result", onGradeEvent);
    };
  }, [navigate, setFailedScan, setFiles, setLoading, setLocalGradeInfo]);

  return (
    <Button
      isDisabled={isLoading}
      leftIcon={<AiOutlineScan />}
      onClick={handleSubmit}
    >
      Grade
    </Button>
  );
}
