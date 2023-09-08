"use client";

import { Button, IconButton, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { TbScan } from "react-icons/tb";
import { MdOutlineFolderCopy } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";

export default function ScanPage() {
  return (
    <Stack align="center" pt="6rem">
      <Image
        src="/scan.svg"
        alt="scan"
        width={500}
        height={500}
        style={{ width: "8rem", opacity: ".6" }}
      />

      <Text
        fontSize="1.2rem"
        opacity=".6"
        fontWeight="semibold"
        color="palette.button.primary"
      >
        Upload or scan your test paper.
      </Text>
      <Text
        fontWeight="normal"
        opacity=".6"
        fontSize=".9rem"
        color="palette.button.primary"
      >
        Automate the grading of test paper
      </Text>
      <Stack direction="row" align="center" pt="10rem" spacing="2rem">
        <IconButton
          variant="ghost"
          aria-label="folder"
          fontSize="1.6rem"
          color="palette.accent"
          opacity={0.8}
          icon={<MdOutlineFolderCopy />}
        />
        <Button
          w="fit-content"
          leftIcon={<TbScan style={{ fontSize: "1.5rem" }} />}
        >
          SCAN
        </Button>
        <IconButton
          variant="ghost"
          aria-label="setting"
          fontSize="1.6rem"
          opacity={0.8}
          color="palette.accent"
          icon={<RiSettings3Line />}
        />
      </Stack>
    </Stack>
  );
}
