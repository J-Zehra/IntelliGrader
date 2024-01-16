/* eslint-disable no-new */
import { Box, Center, Input } from "@chakra-ui/react";
import React, { ChangeEvent, useRef } from "react";
import { CiFileOn } from "react-icons/ci";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
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
      <Center
        cursor="pointer"
        borderRadius=".6rem"
        _hover={{ opacity: 0.8 }}
        onClick={handleClick}
        fontSize="1.2rem"
      >
        <CiFileOn opacity={0.8} />
      </Center>
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
