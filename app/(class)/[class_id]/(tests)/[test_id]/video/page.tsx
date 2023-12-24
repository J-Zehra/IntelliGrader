"use client";

import { Box, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useSetRecoilState } from "recoil";
import { localGradeInfo } from "@/state/localGradeInfo";
import { useRouter } from "next/navigation";
import { socket } from "../socket";

export default function VideoPage() {
  const setLocalGradesInfo = useSetRecoilState(localGradeInfo);
  const navigate = useRouter();
  const [openCamera, setOpenCamera] = useState<boolean>(true);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const captureFrame = () => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        socket.emit("image", imageSrc);
      }
    };

    const interval = setInterval(captureFrame, 100); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  socket.on("request_test_data", (data) => {
    console.log(data);
    setOpenCamera(false);

    const testData = {
      rollNumberSection: data.rollNumberSection,
      bubbleSection: data.bubbleSection,
      answer: [0, 1, 2, 2, 3, 3, 3],
      numberOfChoices: [5, 5, 5, 5],
    };

    socket.emit("single_grade", testData);
  });

  socket.on("single_grade_data", (data) => {
    setLocalGradesInfo(data);
    console.log(data);

    socket.disconnect();
    navigate.push("local_student_grades");
  });

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
          minScreenshotHeight={910}
          minScreenshotWidth={595}
          videoConstraints={{
            facingMode: "environment",
            aspectRatio: 4 / 3,
          }}
          allowFullScreen
        />
      ) : (
        <Text>Processing</Text>
      )}
    </Box>
  );
}
