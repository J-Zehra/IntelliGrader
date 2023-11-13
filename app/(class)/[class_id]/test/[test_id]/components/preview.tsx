/* eslint-disable @typescript-eslint/naming-convention */
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
import { useRecoilState } from "recoil";
import { AiOutlinePlus, AiOutlineScan } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import imageCompression, { Options } from "browser-image-compression";
import { useParams, usePathname, useRouter } from "next/navigation";
import Lottie from "react-lottie-player";
import { useMutation } from "@tanstack/react-query";
import { fileState } from "@/state/fileState";
import { FetchedGradeInfo } from "@/utils/types";
import ScanningAnimation from "../../../../../../public/scanning_animation_2.json";
import ScanButton from "./scanButton";

export default function Preview({ answer }: { answer: number[] | undefined }) {
  const toast = useToast();
  const { test_id } = useParams();
  const currentPath = usePathname();
  const navigate = useRouter();
  const [files, setFiles] = useRecoilState(fileState);
  const [loading, setLoading] = useState<boolean>(false);

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

      navigate.push(`${currentPath}/grade`);
    },
  });

  const handleSubmit = async () => {
    if (!files || !answer) {
      console.log("No File");
      return;
    }

    setLoading(true);
    const options: Options = {
      maxSizeMB: 1,
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
