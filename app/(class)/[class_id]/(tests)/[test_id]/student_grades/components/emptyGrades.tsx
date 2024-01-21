import { Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function EmptyGrades() {
  return (
    <Stack align="center" mt={10}>
      <Image
        src="/empty_class.svg"
        alt="empty-class"
        width={500}
        height={500}
        style={{ width: "5rem" }}
      />
      <Text
        fontSize="1rem"
        opacity=".6"
        fontWeight="semibold"
        color="palette.button.primary"
      >
        No grades test papers yet.
      </Text>
      <Text
        fontWeight="normal"
        opacity=".6"
        fontSize=".8rem"
        color="palette.button.primary"
      >
        So spacious here. Why not grade one?
      </Text>
    </Stack>
  );
}
