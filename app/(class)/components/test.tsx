import { Button, Center, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";
import { useParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ClassVariant, FetchedClassInfo, FetchedTestInfo } from "@/utils/types";
import { item } from "@/utils/animations";

export default function Test({
  variant,
  testInfo,
}: {
  variant: ClassVariant;
  testInfo: FetchedTestInfo;
}) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { class_id } = useParams();

  const getClass = async () => {
    let classInfo: FetchedClassInfo = {
      id: "",
      course: "",
      section: "",
      year: 0,
      subject: "",
    };
    await axios.get(`/api/class/${class_id}`).then((res) => {
      classInfo = res.data;
    });

    return classInfo;
  };

  const { data: classData } = useQuery({
    queryKey: ["class"],
    queryFn: getClass,
  });

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
      overflow="hidden"
      boxShadow="0 2px 5px rgba(0, 0, 50, .2)"
      as={motion.div}
      variants={item}
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
            {testInfo.testName}
          </Text>
          <Text fontSize=".8rem" fontWeight="medium" opacity={0.8}>
            {`${testInfo.totalQuestions} Total Questions`}
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
          bottom={-4}
        >
          {`${classData?.course} ${classData?.year}`}
        </Text>
        <Stack color={textColorVariant()} direction="row" spacing={4}>
          <Center p=".1rem" fontSize="1.2rem" cursor="pointer" opacity=".8">
            <BsBarChartLine />
          </Center>
          <Button
            as={Link}
            href={`${class_id}/test/${testInfo.id}`}
            bg="palette.background"
            color="palette.text"
            p=".5rem 1rem"
            fontSize=".8rem"
            h="fit-content"
          >
            Use
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
