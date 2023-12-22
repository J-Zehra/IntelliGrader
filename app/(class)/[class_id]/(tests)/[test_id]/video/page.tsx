/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/media-has-caption */

"use client";

import { Box, Image } from "@chakra-ui/react";

export default function VideoPage() {
  return (
    <Box w="100%" bg="rgba(0, 0, 0, .1)" h="100vh">
      <Image
        src="http://127.0.0.1:5000/video_feed"
        alt="Camera Feed"
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
}
