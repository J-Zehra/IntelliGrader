"use client";

import { Box, Select, Stack, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { processedImageState } from "@/state/answerState";
import StudentGradeItem from "./components/studentGradeItem";

export default function GradePage() {
  const processedImage = useRecoilValue(processedImageState);
  return (
    <Box>
      <Stack direction="row" w="100%" justify="space-between" align="center">
        <Text fontSize=".8rem" fontWeight="normal">
          Total of 1 paper
        </Text>
        <Select placeholder="Sort" w="6rem" fontSize=".8rem" colorScheme="red">
          <option value="option1" style={{ fontSize: ".8rem" }}>
            Highest
          </option>
          <option value="option2">Lowest</option>
        </Select>
      </Stack>
      <Stack marginTop={10}>
        {[1].map((item) => {
          return <StudentGradeItem key={item} />;
        })}
      </Stack>
      <Image
        alt="Processed Image"
        src={processedImage.processed_image}
        width={500}
        height={500}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: ".4rem",
          opacity: 0.8,
        }}
      />
    </Box>
  );
}
