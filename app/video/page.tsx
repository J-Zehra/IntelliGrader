"use client";

import { Box, Image } from "@chakra-ui/react";

export default function VideoPage() {
  return (
    <Box bg="rgba(0, 0, 0, .1)" h="80vh">
      <Image
        src="https://jazen.pythonanywhere.com/video_feed"
        w="100%"
        h="100%"
      />
    </Box>
  );
}
