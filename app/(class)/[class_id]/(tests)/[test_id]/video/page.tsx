"use client";

import { Box, Stack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
// import { useSetRecoilState } from "recoil";
// import { localGradeInfo } from "@/state/localGradeInfo";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import { socket } from "../socket";

export default function VideoPage() {
  // const setLocalGradesInfo = useSetRecoilState(localGradeInfo);
  const [rollNumberSection, setRollNumberSection] = useState("");
  const [bubbleSection, setBubbleSection] = useState("");
  // const navigate = useRouter();
  const [openCamera, setOpenCamera] = useState<boolean>(true);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const captureFrame = async () => {
      const imageSrc = webcamRef.current?.getScreenshot({
        width: 600,
        height: 800,
      });

      if (imageSrc && openCamera) {
        const convertBase64ToBinary = (base64: string) => {
          const binaryString = atob(base64);
          const { length } = binaryString;
          const bytes = new Uint8Array(length);

          for (let i = 0; i < length; i += 1) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          return bytes;
        };

        const binaryData = convertBase64ToBinary(imageSrc.split(",")[1]);

        socket.emit("video", { image: binaryData });
      }
    };

    captureFrame();
  }, [openCamera]);

  useEffect(() => {
    const onDetected = (data: any) => {
      setOpenCamera(false);
      setRollNumberSection(data.roll_number_section);
      setBubbleSection(data.bubbles_section);
      console.log("Detected:", data);
    };

    socket.on("detected", onDetected);

    return () => {
      socket.off("detected", onDetected);
    };
  }, []);

  return (
    <Box
      w="100%"
      pos="absolute"
      zIndex="overlay"
      bg="rgba(0, 0, 0, .1)"
      h="100vh"
    >
      {openCamera ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "environment",
            aspectRatio: 4 / 3,
          }}
        />
      ) : (
        <Stack w="100%" h="100%" p="1rem">
          <Image
            alt="Processed Image"
            src={`data:image/jpeg;base64, ${bubbleSection}`}
            width={500}
            height={500}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          <Image
            alt="Processed Image"
            src={`data:image/jpeg;base64, ${rollNumberSection}`}
            width={500}
            height={500}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Stack>
      )}
    </Box>
  );
}
