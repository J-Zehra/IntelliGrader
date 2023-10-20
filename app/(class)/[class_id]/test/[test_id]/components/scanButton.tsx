/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@chakra-ui/react";
import React, { ChangeEvent, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { fileState } from "@/state/fileState";

export default function ScanButton({
  isLoading,
  variant,
  icon,
  text,
}: {
  text: string;
  isLoading: boolean;
  variant: string;
  icon: React.ReactElement;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const setImage = useSetRecoilState(fileState);

  const openCamera = () => {
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
          setImage((prev) => [
            {
              image: file,
              imageUrl: URL.createObjectURL(file),
            },
            ...prev,
          ]);
        });
      }
    };

    compress();
  };

  return (
    <>
      <Button
        w="fit-content"
        variant={variant}
        disabled={isLoading}
        onClick={openCamera}
        leftIcon={icon}
        p="1.5rem 1rem"
      >
        {text}
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
