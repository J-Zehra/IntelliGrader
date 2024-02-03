/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import {
  Center,
  IconButton,
  Image as ChakraImage,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MdDeleteOutline } from "react-icons/md";
import Lottie from "react-lottie-player";
import { fileState } from "@/state/fileState";
import NetworkSpeed from "network-speed";
import { localGradeInfo } from "@/state/localGradeInfo";
import { failedToScan } from "@/state/failedToScan";
import { useRouter } from "next/navigation";
import { FaArrowRotateLeft } from "react-icons/fa6";
import ScanningAnimation from "../../../../../../public/scanning_animation_2.json";
import GradeButton from "./grade";
import AddMoreButton from "./addMoreButton";
import { socket } from "../socket";

export default function Preview() {
  const [files, setFiles] = useRecoilState(fileState);
  const setLocalGradeInfo = useSetRecoilState(localGradeInfo);
  const setFailedScan = useSetRecoilState(failedToScan);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const toast = useToast();
  const navigate = useRouter();
  const [slowConnection, setSlowConnection] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const rotateImage = (degrees: number, index: number) => {
    setIsRotating(true);
    const selectedFile = files[index];

    if (selectedFile) {
      const img = new Image();
      img.src = selectedFile.imageUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.height;
        canvas.height = img.width;

        ctx!.translate(canvas.width / 2, canvas.height / 2);
        ctx!.rotate((degrees * Math.PI) / 180);
        ctx!.drawImage(img, -img.width / 2, -img.height / 2);

        canvas.toBlob((blob) => {
          const rotatedFile = new File([blob!], selectedFile!.image!.name, {
            type: selectedFile!.image!.type,
          });

          const updatedFiles = [...files];
          updatedFiles[index] = {
            imageUrl: canvas.toDataURL(),
            image: rotatedFile,
          };

          setFiles(updatedFiles);
          setIsRotating(false);
        }, selectedFile!.image!.type);
      };
    }
  };

  const handleDelete = (url: string) => {
    setFiles((prev) => prev.filter((item) => item.imageUrl !== url));
  };

  useEffect(() => {
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

  useEffect(() => {
    const onPartialGradeEvent = (data: any) => {
      if (files.length === 1 && data.status === "failed") {
        toast({
          title: "Error",
          description: data.message,
          position: "top",
          status: "error",
          duration: 3000,
        });
        setLoading(false);
        setFiles([]);
        return;
      }

      if (files.length === 1 && data.status === "success") {
        setLocalGradeInfo([data]);
        setLoading(false);
        setFiles([]);
        navigate.push("local_student_grades");
        return;
      }

      if (data.status === "success") {
        setLocalGradeInfo((prev) => [...prev, data]);
      } else {
        setFailedScan((prev) => [...prev, data]);
      }

      setProgress(data.index);
      console.log(data.index);
    };

    socket.on("progress", onPartialGradeEvent);

    return () => {
      socket.off("progress", onPartialGradeEvent);
    };
  }, [
    files.length,
    navigate,
    setFailedScan,
    setFiles,
    setLocalGradeInfo,
    toast,
  ]);

  return (
    <Stack pb="2rem">
      <Wrap
        padding=".5rem"
        justify="center"
        align="center"
        w="100%"
        pos="relative"
        borderRadius=".5rem"
        h="70vh"
        bg="rgba(0, 0, 0, .02)"
        overflow="auto"
      >
        {files.map((file, index) => {
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
              {isRotating && selectedIndex === index ? (
                <Center
                  pos="absolute"
                  w="100%"
                  h="100%"
                  zIndex={10}
                  bg="rgba(255, 255, 255, .6)"
                >
                  <Text
                    color="palette.button.primary"
                    fontWeight="medium"
                    opacity={0.8}
                    fontSize=".9rem"
                  >
                    Rotating...
                  </Text>
                </Center>
              ) : null}
              <Stack pos="absolute" top={0} spacing={0.5} right={0}>
                <IconButton
                  aria-label="Remove"
                  variant="outline"
                  bg="palette.light"
                  opacity={0.75}
                  color="blue.500"
                  fontSize="1rem"
                  p=".1rem"
                  onClick={() => {
                    setSelectedIndex(index);
                    rotateImage(90, index);
                  }}
                  icon={<FaArrowRotateLeft />}
                />
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
              </Stack>
              <ChakraImage
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
            bg="rgba(255, 255, 255, .9)"
            flexDir="column"
            zIndex={10}
            h="100%"
            paddingBottom="10rem"
            left={0}
            top={0}
          >
            <Lottie
              loop
              animationData={ScanningAnimation}
              play
              style={{ width: 200, height: 200 }}
            />
            <Text
              color="palette.accent"
              fontWeight="bold"
              fontSize="1.5rem"
            >{`${progress}/${files.length}`}</Text>
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
        <AddMoreButton isLoading={loading} />
        <GradeButton isLoading={loading} setLoading={setLoading} />
      </Stack>
    </Stack>
  );
}
