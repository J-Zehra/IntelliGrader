import { Box, Center, Input } from "@chakra-ui/react";
import React, { ChangeEvent, useRef } from "react";
import { CiFileOn } from "react-icons/ci";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { fileState } from "@/state/fileState";

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
    <Box>
      <Center onClick={handleClick}>
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
