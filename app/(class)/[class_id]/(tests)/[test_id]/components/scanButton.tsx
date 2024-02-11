/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Center } from "@chakra-ui/react";
import React, { ChangeEvent, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next13-progressbar";
import { fileState } from "@/state/fileState";
import Compressor from "compressorjs";

export default function ScanButton({
  isLoading,
  icon,
}: {
  isLoading: boolean;
  icon: React.ReactElement;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const setImage = useSetRecoilState(fileState);
  const navigate = useRouter();

  const openCamera = () => {
    navigate.push("scan");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const compress = async () => {
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

    compress();
  };

  return (
    <>
      <Center
        p=".8rem"
        fontSize="1.8rem"
        borderRadius="2rem"
        marginBottom="3rem"
        bg="palette.accent"
        border="5px solid"
        color="palette.background"
        borderColor="palette.background"
        onClick={openCamera}
        cursor="pointer"
        transition="all .3s ease"
        _active={{ bg: "#0025E8" }}
        _hover={{ opacity: 0.8 }}
      >
        {icon}
      </Center>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </>
  );
}
