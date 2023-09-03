import { Center, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineMore, AiOutlineScan } from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";
import { ClassVariant } from "@/utils/types";

export default function Class({ variant }: { variant: ClassVariant }) {
  const bgVariant = () => {
    let background = "";

    switch (variant) {
      case ClassVariant.primary:
        background = "linear-gradient(to left, #003C8F, #006CFB)";
        break;
      case ClassVariant.secondary:
        background = "linear-gradient(to left, #015BD5, #0AA6FF)";
        // CODE
        break;
      case ClassVariant.tertiary:
        background = "linear-gradient(to left, #3A8FFF, #B8E5FF)";
        // CODE
        break;
      default:
        background = "linear-gradient(to left, #D6E6FF, #FAFCFF)";
    }

    return background;
  };

  const textColorVariant = () => {
    let textColor = "";

    if (
      variant === ClassVariant.primary ||
      variant === ClassVariant.secondary
    ) {
      textColor = "palette.background";
    } else {
      textColor = "palette.text";
    }

    return textColor;
  };

  return (
    <Stack
      bg={bgVariant()}
      p=".8rem"
      borderRadius=".5rem"
      pos="relative"
      boxShadow="0 2px 5px rgba(0, 0, 50, .2)"
    >
      <Stack
        direction="row"
        w="100%"
        color={textColorVariant()}
        justify="space-between"
        align="start"
      >
        <Stack spacing={0.1}>
          <Text fontWeight="semibold" fontSize=".9rem">
            System Analysis and Design
          </Text>
          <Text fontSize=".8rem" fontWeight="medium" opacity={0.8}>
            BSIT 3
          </Text>
        </Stack>
        <Center p=".1rem" cursor="pointer" fontSize="1.2rem" opacity=".8">
          <AiOutlineMore />
        </Center>
      </Stack>
      <Stack direction="row" w="100%" align="end" justify="end">
        <Text
          fontWeight="black"
          fontSize="4rem"
          opacity=".03"
          pos="absolute"
          left="1rem"
          bottom={-5}
        >
          BSIT 3
        </Text>
        <Stack color={textColorVariant()} direction="row" spacing={4}>
          <Center p=".1rem" fontSize="1.2rem" cursor="pointer" opacity=".8">
            <BsBarChartLine />
          </Center>
          <Center p=".1rem" cursor="pointer" fontSize="1.2rem" opacity=".8">
            <AiOutlineScan />
          </Center>
        </Stack>
      </Stack>
    </Stack>
  );
}
