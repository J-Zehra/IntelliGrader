"use client";

import { Button, Grid, Link, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import ClassesList from "@/components/classesList";

export default function Home() {
  const isClassEmpty = true;

  if (isClassEmpty) return <ClassesList />;
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
        <Link mt={5} href="/create">
          <Button
            w="fit-content"
            p="0 1rem"
            fontSize=".8rem"
            leftIcon={<IoMdAdd style={{ fontSize: "1rem" }} />}
          >
            Create Class
          </Button>
        </Link>
      </Stack>
    </Grid>
  );
}
