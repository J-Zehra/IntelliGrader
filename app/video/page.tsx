/* eslint-disable jsx-a11y/media-has-caption */

"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
// import { io } from "socket.io-client";

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // const socket = io("http://your-flask-server-address");

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 1920,
          height: 1080,
          facingMode: { exact: "environment" },
        },
      })
      .then((stream) => {
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <Box w="100%" bg="rgba(0, 0, 0, .1)" h="100%">
      <video ref={videoRef} />;
    </Box>
  );
}
