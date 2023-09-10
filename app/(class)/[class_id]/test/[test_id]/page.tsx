"use client";

import { IconButton, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

import { MdOutlineFolderCopy } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";

import ScanButton from "./components/camera";

export default function ScanPage() {
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
        />
        <ScanButton />
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
