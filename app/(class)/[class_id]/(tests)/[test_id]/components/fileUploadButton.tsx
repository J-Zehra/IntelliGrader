/* eslint-disable no-new */
import { Box, Input, Stack, Text } from "@chakra-ui/react";
import React, { ChangeEvent, useRef } from "react";
import { CiFileOn } from "react-icons/ci";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next13-progressbar";
import { fileState } from "@/state/fileState";
import Compressor from "compressorjs";

export default function FileUploadButton() {
  const setImage = useSetRecoilState(fileState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useRouter();

  const handleClick = () => {
    navigate.push("scan");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const { files } = event.target;
      const fileList = Array.from(files);

      fileList.forEach((file) => {
        new Compressor(file, {
          quality: 0.8,
          success: (result) => {
            setImage((prev) => [
              {
                image: result as File,
                imageUrl: URL.createObjectURL(result),
              },
              ...prev,
            ]);
          },
        });
      });
    }
  };

  return (
    <Box>
      <Stack
        align="center"
        cursor="pointer"
        borderRadius="3rem"
        _hover={{ opacity: 0.8 }}
        onClick={handleClick}
        fontSize="1.2rem"
        w="3.5rem"
        h="3.5rem"
        p=".5rem"
        flexDirection="column"
      >
        <CiFileOn opacity={0.8} />
        <Text fontSize=".7rem" opacity={0.8}>
          Upload
        </Text>
      </Stack>
      <Input
        type="file"
        display="none"
        multiple
        accept="image/*"
        onChange={handleChange}
        ref={fileInputRef}
      />
    </Box>
  );
}
