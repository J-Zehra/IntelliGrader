"use client";

import { Box, Button, IconButton, Center, Stack, Text } from "@chakra-ui/react";
import CustomContainer from "@/components/reusables/customContainer";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TbScan } from "react-icons/tb";
import { MdOutlineFolderCopy } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";

export default function ScanPage() {
  const navigate = useRouter();
  return (
    <CustomContainer>
      <Stack pt="6rem" spacing={5}>
        <Stack w="100%" direction="row" justify="space-between" align="center">
          <Center
            p=".5rem"
            fontSize="1.2rem"
            color="palette.button.primary"
            cursor="pointer"
            borderRadius=".2rem"
            onClick={() => navigate.back()}
          >
            <BsArrowReturnLeft />
          </Center>
          <Stack direction="row" align="center">
            <Text fontSize="1rem" color="palette.button.primary" fontWeight="bold">Final Examination</Text>
            <Box w=".8rem" h=".8rem" borderRadius="50%" bg="palette.accent" />
          </Stack>

        </Stack>
      </Stack>

      <Stack spacing={0} align="end">
        <Text fontSize=".8rem" color="palette.text" opacity={.8}>System Analysis and Design</Text>
      </Stack>


      <Stack align="center" pt="10rem">
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
        <Stack direction="row" align="center" pt="8rem" spacing="2rem">

          <IconButton
            variant='ghost'
            colorScheme='blue'
            aria-label='folder'
            fontSize='30px'
            icon={<MdOutlineFolderCopy />}
          />

          <Link href="/create">
            <Button
              w="fit-content"
              fontSize=".9rem"
              leftIcon={<TbScan style={{ fontSize: "2rem" }} />}
            >
              SCAN
            </Button>
          </Link>

          <IconButton
            variant='ghost'
            colorScheme='blue'
            aria-label='setting'
            fontSize='30px'
            icon={<RiSettings3Line />}
          />

        </Stack>

      </Stack>
    </CustomContainer>
  );
}
