/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

import { useRecoilValue } from "recoil";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { fileState } from "@/state/fileState";
import { FetchedTestInfo, TestNavLink } from "@/utils/types";
import { queryClient } from "@/components/wrappers/queryWrapper";
import useTestObserver from "@/hooks/useTestObserver";
import Link from "next/link";
import Preview from "../components/preview";

export default function ScanPage() {
  const { test_id } = useParams();
  const image = useRecoilValue(fileState);
  const { ref } = useTestObserver(TestNavLink.scan);

  useEffect(() => {
    const getTest = async () => {
      let test: Partial<FetchedTestInfo> = {};
      await axios.get(`/api/tests/${test_id}`).then((res) => {
        test = res.data;
      });

      return test;
    };
    const prefetchClassInfo = async () => {
      await queryClient.prefetchQuery({ queryKey: ["test"], queryFn: getTest });
    };
    prefetchClassInfo();
  }, [test_id]);

  if (image.length > 0) {
    return <Preview />;
  }

  return (
    <Stack align="center" spacing="5rem" pt="2.5rem" justify="center" ref={ref}>
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
      <Stack align="center" pos="absolute" bottom="10rem" spacing=".5rems">
        <Text fontSize=".8rem" color="palette.button.primary">
          Having a problem scanning?
        </Text>
        <Link href="/tutorial/scanning-guide">
          <Text fontSize=".8rem" fontWeight="medium" color="palette.accent">
            See Scanning Guide
          </Text>
        </Link>
      </Stack>
    </Stack>
  );
}
