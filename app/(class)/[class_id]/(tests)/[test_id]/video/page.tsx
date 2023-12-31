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
    const captureFrame = () => {
      const imageSrc = webcamRef.current?.getScreenshot({
        width: 720,
        height: 960,
      });
      if (imageSrc && openCamera) {
        socket.emit("image", imageSrc, (cb: any) => {
          if (cb.status === "success") {
            setOpenCamera(false);
            setRollNumberSection(cb.rollNumberSection);
            setBubbleSection(cb.bubbleSection);

            // const testData = {
            //   rollNumberSection: data.rollNumberSection,
            //   bubbleSection: data.bubbleSection,
            //   answer: [0, 1, 2, 2, 3, 3, 3],
            //   numberOfChoices: [5, 5, 5, 5],
            // };

            // socket.emit("single_grade", testData, (processedTestData: any) => {
            //   setLocalGradesInfo(processedTestData);
            //   navigate.push("local_student_grades");
            // });
          }
        });
      }
    };

    const interval = setInterval(captureFrame, 100);

    return () => clearInterval(interval);
  }, [openCamera]);

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
          allowFullScreen
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
