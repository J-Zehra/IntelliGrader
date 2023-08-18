"use client";

import { Button, Grid, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import ClassesList from "@/components/classesList";

export default function Home() {
  const isClassEmpty = false;

  if (!isClassEmpty) return <ClassesList />;
  return (
    <Grid placeContent="center" w="100%" h="100vh" gap="2rem">
      <Stack align="center">
        <Image
          src="/empty_class.svg"
          alt="empty-class"
          width={500}
          height={500}
          style={{ width: "8rem" }}
        />
        <Text
          fontSize="1.2rem"
          opacity=".6"
          fontWeight="semibold"
          color="palette.button.primary"
        >
          No classes yet.
        </Text>
        <Text
          fontWeight="normal"
          opacity=".6"
          fontSize=".9rem"
          color="palette.button.primary"
        >
          So spacious here. Why not create one?
        </Text>
        <Button
          mt={5}
          w="fit-content"
          fontSize=".9rem"
          leftIcon={<IoMdAdd style={{ fontSize: "1rem" }} />}
        >
          Create Class
        </Button>
      </Stack>
    </Grid>
  );
}
