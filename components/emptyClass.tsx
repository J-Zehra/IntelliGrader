import { Grid, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function EmptyClass() {
  return (
    <Grid placeContent="center" w="100%" h="60vh" gap="2rem">
      <Stack align="center">
        <Image
          src="/empty_class.svg"
          alt="empty-class"
          width={500}
          height={500}
          style={{ width: "8rem" }}
        />
        <Text
          fontSize="1rem"
          opacity=".6"
          fontWeight="semibold"
          color="palette.button.primary"
        >
          No classes yet.
        </Text>
        <Text
          fontWeight="normal"
          opacity=".6"
          fontSize=".8rem"
          color="palette.button.primary"
        >
          So spacious here. Why not create one?
        </Text>
      </Stack>
    </Grid>
  );
}
