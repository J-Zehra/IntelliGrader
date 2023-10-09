/* eslint-disable jsx-a11y/media-has-caption */

"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: { exact: "environment" } },
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
    <Box w="100%" bg="rgba(0, 0, 0, .1)" h="100vh" pos="absolute" top={0}>
      <video ref={videoRef} style={{ width: "100%", height: "100vh" }} />;
      <Box
        w="100%"
        h="100%"
        pos="absolute"
        zIndex="popover"
        top={0}
        borderTop="5rem solid rgba(0, 0, 0, .5)"
        borderBottom="12rem solid rgba(0, 0, 0, .5)"
        borderInline="1rem solid rgba(0, 0, 0, .5)"
      />
    </Box>
  );
}
