/* eslint-disable no-console */
import { Button, Center, IconButton, Image, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { AiOutlineScan } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { fileState } from "@/state/fileState";

export default function Preview() {
  const [file, setFile] = useRecoilState(fileState);
  const [processedImage, setProcessedImage] = useState("");

  const handleSubmit = async () => {
    if (!file.image) {
      console.log("No File");
      return;
    }

    const formData = new FormData();
    formData.append("image", file.image);

    // API REQUEST
    axios
      .post("https://jazen.pythonanywhere.com/check", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        const { data } = res;
        console.log(data);
        setProcessedImage(`data:image/jpeg;base64, ${data.image}`);
      })
      .catch((err) => {
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
        <Image borderRadius=".5rem" src={file.imageUrl} w="25%" />
        {processedImage ? (
          <Image borderRadius=".5rem" src={processedImage} w="75%" />
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
        <Button leftIcon={<AiOutlineScan />} onClick={handleSubmit}>
          Grade
        </Button>
      </Stack>{" "}
    </Stack>
  );
}
