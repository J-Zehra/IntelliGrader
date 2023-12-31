"use client";

import { Box, Image, Stack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useSetRecoilState } from "recoil";
import { localGradeInfo } from "@/state/localGradeInfo";
import { useRouter } from "next/navigation";
import { socket } from "../socket";

export default function VideoPage() {
  const setLocalGradesInfo = useSetRecoilState(localGradeInfo);
  const [rollNumberSection, setRollNumberSection] = useState("");
  const [bubbleSection, setBubbleSection] = useState("");
  const navigate = useRouter();
  const [openCamera, setOpenCamera] = useState<boolean>(true);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const captureFrame = () => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc && !rollNumberSection && !bubbleSection) {
        socket.emit("image", imageSrc);
        socket.on("request_test_data", (data) => {
          if (data.status === "failed") {
            return;
          }

          setOpenCamera(false);
          setRollNumberSection(data.rollNumberSection);
          setBubbleSection(data.bubbleSection);

          const testData = {
            rollNumberSection: data.rollNumberSection,
            bubbleSection: data.bubbleSection,
            answer: [0, 1, 2, 2, 3, 3, 3],
            numberOfChoices: [5, 5, 5, 5],
          };

          socket.emit("single_grade", testData);
          socket.on("single_grade_data", (data2) => {
            setLocalGradesInfo(data2);
            console.log(data2);

            socket.disconnect();
            navigate.push("local_student_grades");
          });
        });
      }
    };

    const interval = setInterval(captureFrame, 100); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [bubbleSection, navigate, rollNumberSection, setLocalGradesInfo]);

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
          minScreenshotHeight={800}
          minScreenshotWidth={600}
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
