/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import {
  Box,
  Center,
  IconButton,
  Image,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useLayoutEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { MdDeleteOutline } from "react-icons/md";
import Lottie from "react-lottie-player";
import { fileState } from "@/state/fileState";
import NetworkSpeed from "network-speed";
import ScanningAnimation from "../../../../../../public/scanning_animation_2.json";
import GradeButton from "./grade";
import AddMoreButton from "./addMoreButton";

export default function Preview() {
  const [files, setFiles] = useRecoilState(fileState);
  const [loading, setLoading] = useState<boolean>(false);
  const [slowConnection, setSlowConnection] = useState<boolean>(false);

  const handleDelete = (url: string) => {
    setFiles((prev) => prev.filter((item) => item.imageUrl !== url));
  };

  useLayoutEffect(() => {
    const testNetworkSpeed = new NetworkSpeed();
    const getDownloadSpeed = async () => {
      const baseUrl = "https://eu.httpbin.org/stream-bytes/500000";
      const fileSizeInBytesDownload = 500000;
      const downloadSpeed = await testNetworkSpeed.checkDownloadSpeed(
        baseUrl,
        fileSizeInBytesDownload,
      );

      if (parseFloat(downloadSpeed.mbps) > 5) {
        setSlowConnection(false);
      } else {
        setSlowConnection(true);
      }

      console.log("DOWNLOAD", downloadSpeed);
    };

    let interval: NodeJS.Timeout;

    if (loading) {
      interval = setInterval(() => {
        getDownloadSpeed();
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  console.log(slowConnection);

  return (
    <Stack pb="2rem">
      <Wrap
        padding=".5rem"
        justify="start"
        align="center"
        w="100%"
        pos="relative"
        borderRadius=".5rem"
      >
        {files.map((file) => {
          return (
            <WrapItem
              key={file.imageUrl}
              pos="relative"
              w={
                files.length === 1
                  ? "100%"
                  : files.length === 2
                  ? "48%"
                  : files.length === 3
                  ? "30%"
                  : "23%"
              }
            >
              <Box pos="absolute" top={0} right={0}>
                <IconButton
                  aria-label="Remove"
                  variant="outline"
                  bg="palette.light"
                  opacity={0.75}
                  color="red.500"
                  fontSize="1.3rem"
                  onClick={() => handleDelete(file.imageUrl)}
                  icon={<MdDeleteOutline />}
                />
              </Box>
              <Image
                borderRadius=".5rem"
                src={file.imageUrl}
                w="100%"
                boxShadow="2px 2px 10px rgba(0, 0, 100, .1)"
                opacity={loading ? 0.3 : 1}
              />
            </WrapItem>
          );
        })}
        {loading ? (
          <Center
            pos="absolute"
            w="100%"
            flexDir="column"
            zIndex={10}
            h="100%"
            left={0}
            top={0}
          >
            <Lottie
              loop
              animationData={ScanningAnimation}
              play
              style={{ width: 200, height: 200 }}
            />
          </Center>
        ) : null}
      </Wrap>
      {loading && slowConnection ? (
        <Stack spacing={0.5}>
          <Text
            textAlign="center"
            fontWeight="semibold"
            fontSize=".8rem"
            color="palette.button.primary"
          >
            Slow connection
          </Text>
          <Text
            textAlign="center"
            fontSize=".8rem"
            color="palette.button.primary"
          >
            This might take a while than the usual
          </Text>
        </Stack>
      ) : null}
      <Stack direction="row" justify="end" align="center" spacing={2.5} pt={5}>
        <IconButton
          aria-label="Delete Icon"
          variant="ghost"
          fontSize="1.5rem"
          color="palette.accent"
          onClick={() => setFiles([])}
          icon={<MdDeleteOutline />}
        />
        <AddMoreButton />
        <GradeButton setLoading={setLoading} />
      </Stack>
    </Stack>
  );
}
