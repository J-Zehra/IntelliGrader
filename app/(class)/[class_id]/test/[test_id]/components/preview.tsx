/* eslint-disable no-console */
import { Button, Center, IconButton, Image, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AiOutlineScan } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import imageCompression, { Options } from "browser-image-compression";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fileState } from "@/state/fileState";
import { processedImageState } from "@/state/answerState";
import { FetchedTestInfo } from "@/utils/types";

export default function Preview() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { test_id } = useParams();
  const currentPath = usePathname();
  const navigate = useRouter();
  const [file, setFile] = useRecoilState(fileState);
  const setProcessedImageData = useSetRecoilState(processedImageState);
  const [loading, setLoading] = useState<boolean>(false);

  const getTest = async () => {
    let test: Partial<FetchedTestInfo> = {};
    await axios.get(`/api/tests/${test_id}`).then((res) => {
      test = res.data;
    });

    return test;
  };

  const { data: testData } = useQuery({ queryKey: ["test"], queryFn: getTest });

  const handleSubmit = async () => {
    if (!file.image || !testData) {
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
    formData.append("answer", JSON.stringify(testData.answerIndices));

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

        setProcessedImageData({
          answerIndices: data.answer_indices,
          processed_image: `data:image/jpeg;base64, ${data.image}`,
        });

        navigate.push(`${currentPath}/grade`);
      })
      .catch((err) => {
        setLoading(false);
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
      >
        <Image borderRadius=".5rem" src={file.imageUrl} w="100%" />
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
