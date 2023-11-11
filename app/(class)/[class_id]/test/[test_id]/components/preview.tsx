/* eslint-disable no-nested-ternary */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import {
  Button,
  Center,
  IconButton,
  Image,
  Stack,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AiOutlinePlus, AiOutlineScan } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import imageCompression, { Options } from "browser-image-compression";
import { usePathname, useRouter } from "next/navigation";
import Lottie from "react-lottie-player";
import { fileState } from "@/state/fileState";
import { gradeState } from "@/state/gradeState";
import { FetchedGradeInfo, Grade } from "@/utils/types";
import ScanningAnimation from "../../../../../../public/scanning_animation_2.json";
import ScanButton from "./scanButton";

export default function Preview({ answer }: { answer: number[] | undefined }) {
  const toast = useToast();
  const currentPath = usePathname();
  const setGradeInfo = useSetRecoilState(gradeState);
  const navigate = useRouter();
  const [files, setFiles] = useRecoilState(fileState);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!files || !answer) {
      console.log("No File");
      return;
    }

    setLoading(true);
    const options: Options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    async function compressAndAppendImages() {
      const formData = new FormData();
      for (let index = 0; index < files.length; index++) {
        const { image } = files[index];
        const compressedFile = await imageCompression(image!, options);
        formData.append("images", compressedFile);
      }

      formData.append("answer", JSON.stringify(answer));
      return formData;
    }

    compressAndAppendImages().then((formData) => {
      axios
        .post("http://127.0.0.1:5000/process", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const { data } = res;
          console.log(data);
          setLoading(false);

          const processedImages: Grade[] = [];
          data.forEach((item: FetchedGradeInfo) => {
            const processedImageData: Grade = {
              processedImage: `data:image/jpeg;base64, ${item.processed_image}`,
              totalNumberOfCorrect: item.number_of_correct,
              totalNumberOfWrong: item.number_of_incorrect,
              answerIndices: item.answer_indices,
              rollNumber: item.roll_number,
            };

            processedImages.push(processedImageData);
          });

          setGradeInfo(processedImages);

          toast({
            title: "Success",
            status: "success",
            duration: 3000,
          });

          navigate.push(`${currentPath}/grade`);
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
    <Stack>
      <Wrap
        bg="palette.light"
        padding="1rem"
        justify="start"
        align="center"
        w="100%"
        pos="relative"
        borderRadius=".5rem"
      >
        {files.map((file) => {
          return (
            <WrapItem
              key={file.imageUrl}
              w={
                files.length === 1
                  ? "100%"
                  : files.length === 2
                  ? "48%"
                  : files.length === 3
                  ? "30%"
                  : "23%"
              }
            >
              <Image
                borderRadius=".5rem"
                src={file.imageUrl}
                w="100%"
                opacity={loading ? 0.3 : 1}
              />
              {loading ? (
                <Center
                  pos="absolute"
                  w="100%"
                  zIndex={10}
                  h="100%"
                  left={0}
                  top={0}
                >
                  <Lottie
                    loop
                    animationData={ScanningAnimation}
                    play
                    style={{ width: 300, height: 300 }}
                  />
                </Center>
              ) : null}
            </WrapItem>
          );
        })}
      </Wrap>
      <Stack direction="row" justify="end" align="center" spacing={5} pt={5}>
        <IconButton
          aria-label="Delete Icon"
          variant="ghost"
          fontSize="1.5rem"
          color="palette.accent"
          onClick={() => setFiles([])}
          icon={<MdDeleteOutline />}
        />
        <ScanButton
          isLoading={false}
          variant="outline"
          icon={<AiOutlinePlus />}
          text="Add more"
        />
        <Button
          leftIcon={<AiOutlineScan />}
          isLoading={loading}
          loadingText="Grading..."
          onClick={handleSubmit}
        >
          Grade
        </Button>
      </Stack>
    </Stack>
  );
}
