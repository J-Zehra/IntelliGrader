"use client";

import { Center, Select, Stack, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { gradeState } from "@/state/gradeState";
import StudentGradeItem from "./components/studentGradeItem";

export default function GradePage() {
  const gradeInfo = useRecoilValue(gradeState);
  return (
    <Stack spacing={2} paddingBottom={5}>
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
      <Center p="1rem" bg="palette.light">
        <Image
          alt="Processed Image"
          src={gradeInfo.processedImage}
          width={500}
          height={500}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: ".4rem",
            opacity: 0.8,
          }}
        />
      </Center>
    </Stack>
  );
}
