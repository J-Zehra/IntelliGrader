/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlineScan } from "react-icons/ai";
import { useParams } from "next/navigation";
import { useRouter } from "next13-progressbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { FetchedTestInfoToProcess } from "@/utils/types";
import { fileState } from "@/state/fileState";
import imageCompression, { Options } from "browser-image-compression";
import { localGradeInfo } from "@/state/localGradeInfo";
import { socket } from "../socket";

export default function GradeButton({
  setLoading,
  isLoading,
}: {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { test_id } = useParams();
  const navigate = useRouter();
  const [files, setFiles] = useRecoilState(fileState);
  const setLocalGrade = useSetRecoilState(localGradeInfo);

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

      const parts = testData!.testParts!.map((part) => {
        return {
          numberOfChoices: part.numberOfChoices || 0,
          points: part.points || 0,
          totalNumber: part.totalNumber || 0,
          mdat: part.mdatPoints,
          format: testData?.format,
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
    const onGradeEvent = () => {
      setFiles([]);
      navigate.push("local_student_grades");
    };

    socket.on("finished", onGradeEvent);

    return () => {
      socket.off("grade_result", onGradeEvent);
    };
  }, []);

  useEffect(() => {
    setLocalGrade([]);
  }, []);

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
