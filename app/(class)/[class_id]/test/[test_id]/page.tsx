/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { IconButton, Input, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

import { MdOutlineFolderCopy } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";

import { useRecoilState } from "recoil";
import { ChangeEvent, useRef } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { TbScan } from "react-icons/tb";
import { fileState } from "@/state/fileState";
import { FetchedTestInfo } from "@/utils/types";
import ScanButton from "./components/scanButton";
import Preview from "./components/preview";

export default function ScanPage() {
  const { test_id } = useParams();
  const [image, setImage] = useRecoilState(fileState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getTest = async () => {
    let test: Partial<FetchedTestInfo> = {};
    await axios.get(`/api/tests/${test_id}`).then((res) => {
      test = res.data;
    });

    return test;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["test"],
    queryFn: getTest,
  });

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

  if (image.length > 0) {
    return <Preview answer={data?.answerIndices} />;
  }

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
        <ScanButton
          isLoading={isLoading}
          variant="solid"
          icon={<TbScan fontSize="1.3rem" />}
          text="Scan"
        />
        <Input
          type="file"
          display="none"
          multiple
          accept="image/*"
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
