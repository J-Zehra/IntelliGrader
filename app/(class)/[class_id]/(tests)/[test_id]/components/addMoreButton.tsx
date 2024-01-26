/* eslint-disable no-new */
import { Button } from "@chakra-ui/react";
import React, { ChangeEvent, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { IoMdAdd } from "react-icons/io";
import { fileState } from "@/state/fileState";
import { useRouter } from "next/navigation";
import Compressor from "compressorjs";

export default function AddMoreButton({ isLoading }: { isLoading: boolean }) {
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
      <Button
        bg="transparent"
        border="1px solid"
        isDisabled={isLoading}
        borderColor="palette.accent"
        color="palette.accent"
        boxShadow="none"
        leftIcon={<IoMdAdd />}
        onClick={openCamera}
      >
        Add more
      </Button>
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
