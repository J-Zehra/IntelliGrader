"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { socket } from "../socket";

export default function VideoPage() {
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

  return (
    <Box w="100%" bg="rgba(0, 0, 0, .1)" h="100vh">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }}
      />
    </Box>
  );
}
