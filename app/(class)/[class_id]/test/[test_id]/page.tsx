"use client";

import { IconButton, Input, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

import { MdOutlineFolderCopy } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChangeEvent, useRef } from "react";
import { fileState } from "@/state/fileState";
import ScanButton from "./components/scanButton";
import Preview from "./components/preview";

export default function ScanPage() {
  const image = useRecoilValue(fileState);
  const setImage = useSetRecoilState(fileState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (image.imageUrl) {
    return <Preview />;
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage({
        image: event.target.files[0],
        imageUrl: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  return (
    <Stack align="center" spacing="5rem" pt="2.5rem" justify="center">
      <Stack align="center">
        <Image
          src="/scan.svg"
          alt="scan"
          width={500}
          height={500}
          style={{ width: "8rem", opacity: ".6" }}
        />

        <Text
          fontSize="1rem"
          opacity=".6"
          fontWeight="semibold"
          color="palette.button.primary"
        >
          Upload or scan your test paper.
        </Text>
        <Text
          fontWeight="normal"
          opacity=".6"
          fontSize=".8rem"
          color="palette.button.primary"
        >
          Automate the grading of test paper
        </Text>
      </Stack>
      <Stack direction="row" align="center" spacing="2rem">
        <IconButton
          variant="ghost"
          aria-label="folder"
          fontSize="1.5rem"
          color="palette.accent"
          opacity={0.8}
          icon={<MdOutlineFolderCopy />}
          onClick={handleClick}
        />
        <ScanButton />
        <Input
          type="file"
          display="none"
          onChange={handleChange}
          ref={fileInputRef}
        />
        <IconButton
          variant="ghost"
          aria-label="setting"
          fontSize="1.5rem"
          opacity={0.8}
          color="palette.accent"
          icon={<RiSettings3Line />}
        />
      </Stack>
    </Stack>
  );
}
