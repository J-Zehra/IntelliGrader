import { Button, Input } from "@chakra-ui/react";
import React, { ChangeEvent, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { IoMdAdd } from "react-icons/io";
import { fileState } from "@/state/fileState";

export default function AddMoreButton() {
  const setImage = useSetRecoilState(fileState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      <Button
        bg="transparent"
        border="1px solid"
        borderColor="palette.accent"
        color="palette.accent"
        boxShadow="none"
        leftIcon={<IoMdAdd />}
        onClick={handleClick}
      >
        Add more
      </Button>
      <Input
        type="file"
        display="none"
        multiple
        accept="image/*"
        onChange={handleChange}
        ref={fileInputRef}
      />
    </>
  );
}
