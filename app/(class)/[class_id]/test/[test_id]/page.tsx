"use client";

import {
  Button,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { TbScan } from "react-icons/tb";
import { MdOutlineFolderCopy } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";
import Camera from "./components/camera";

export default function ScanPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack align="center" h="80%" spacing="5rem" justify="center">
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
        <Button
          w="fit-content"
          onClick={onOpen}
          leftIcon={<TbScan style={{ fontSize: "1.5rem" }} />}
        >
          SCAN
        </Button>
        <IconButton
          variant="ghost"
          aria-label="setting"
          fontSize="1.5rem"
          opacity={0.8}
          color="palette.accent"
          icon={<RiSettings3Line />}
        />
      </Stack>
      <Camera onClose={onClose} isOpen={isOpen} />
    </Stack>
  );
}
