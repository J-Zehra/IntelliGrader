/* eslint-disable no-console */
import {
  Button,
  Center,
  IconButton,
  Image,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AiOutlineScan } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import imageCompression, { Options } from "browser-image-compression";
import { usePathname, useRouter } from "next/navigation";
import Lottie from "react-lottie-player";
import { fileState } from "@/state/fileState";
import { gradeState } from "@/state/gradeState";
import ScanningAnimation from "../../../../../../public/scanning_animation.json";

export default function Preview({ answer }: { answer: number[] | undefined }) {
  const toast = useToast();
  const currentPath = usePathname();
  const setGradeInfo = useSetRecoilState(gradeState);
  const navigate = useRouter();
  const [file, setFile] = useRecoilState(fileState);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!file.image || !answer) {
      console.log("No File");
      return;
    }

    setLoading(true);
    const options: Options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file.image, options);

    const formData = new FormData();
    formData.append("image", compressedFile);
    formData.append("answer", JSON.stringify(answer));

    // API REQUEST
    axios
      .post("https://jazen.pythonanywhere.com/check", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { data } = res;
        console.log(data);
        setLoading(false);

        setGradeInfo({
          processedImage: `data:image/jpeg;base64, ${data.image}`,
          gradedAnswerIndices: data.result,
          totalNumberOfCorrect: data.correct,
          totalNumberOfWrong: data.incorrect,
          totalQuestions: data.result.length,
          answerIndices: data.answer_indices,
        });

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
  };

  return (
    <Stack>
      <Center
        bg="palette.light"
        padding="1rem"
        flexDir="row"
        alignItems="start"
        pos="relative"
        borderRadius=".5rem"
      >
        <Image
          borderRadius=".5rem"
          src={file.imageUrl}
          w="100%"
          opacity={loading ? 0.4 : 1}
        />
        {loading ? (
          <Center pos="absolute" zIndex={10} h="100%" top={0}>
            <Lottie
              loop
              animationData={ScanningAnimation}
              play
              style={{ width: 600, height: 400 }}
            />
          </Center>
        ) : null}
      </Center>
      <Stack direction="row" justify="end" align="center" spacing={5} pt={5}>
        <IconButton
          aria-label="Delete Icon"
          variant="ghost"
          fontSize="1.5rem"
          color="palette.accent"
          onClick={() => setFile({ image: null, imageUrl: "" })}
          icon={<MdDeleteOutline />}
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
