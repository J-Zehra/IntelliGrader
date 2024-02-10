/* eslint-disable no-underscore-dangle */
import { Button, Center, Divider, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BsBarChartLine } from "react-icons/bs";
import { motion } from "framer-motion";
import moment from "moment";
import { ClassVariant, FetchedTestInfo } from "@/utils/types";
import { item } from "@/utils/animations";
import MoreOptions from "@/app/(class)/[class_id]/(links)/components/moreOptions";

export default function Test({
  variant,
  testInfo,
}: {
  variant: ClassVariant;
  testInfo: FetchedTestInfo;
}) {
  const bgVariant = () => {
    let background = "";

    switch (variant) {
      case ClassVariant.primary:
        background = "linear-gradient(to left, #003C8F, #006CFB)";
        break;
      case ClassVariant.secondary:
        background = "transparent";
        break;
      default:
        background = "linear-gradient(to left, #E2E8EF, #FAFCFF)";
    }

    return background;
  };

  const textColorVariant = () => {
    let textColor = "";

    if (variant === ClassVariant.primary) {
      textColor = "palette.background";
    } else {
      textColor = "palette.button.primary";
    }

    return textColor;
  };

  const textButtonColorVariant = () => {
    let textColor = "";

    if (
      variant === ClassVariant.primary ||
      variant === ClassVariant.secondary
    ) {
      textColor = "palette.button.primary";
    } else {
      textColor = "palette.background";
    }

    return textColor;
  };

  return (
    <Stack
      flexDir="column"
      bg={bgVariant()}
      p=".8rem"
      w={{ base: "100%", sm: "20rem" }}
      borderRadius="1rem"
      pos="relative"
      paddingInline="1rem"
      border={variant === ClassVariant.secondary ? "1px solid" : ""}
      borderColor={variant === ClassVariant.secondary ? "palette.light" : ""}
      boxShadow={
        variant !== ClassVariant.secondary
          ? "2px 2px 8px rgba(0, 0, 50, .1)"
          : ""
      }
      as={motion.div}
      variants={item}
    >
      <Stack
        direction="row"
        color={textColorVariant()}
        w="100%"
        justify="space-between"
        align="start"
      >
        <Stack spacing={0.1}>
          <Stack
            direction="row"
            paddingBottom=".4rem"
            align="center"
            spacing={2}
          >
            <Text fontWeight="bold" fontSize=".9rem">
              {testInfo.testName}
            </Text>
            <Divider
              opacity={0.2}
              orientation="vertical"
              h="1rem"
              borderColor={textColorVariant()}
            />
            <Text fontSize=".7rem" fontWeight="medium" opacity={0.6}>
              {`${testInfo._count?.testParts} parts`}
            </Text>
          </Stack>
          <Divider borderColor={textColorVariant()} opacity={0.2} />
        </Stack>
        <MoreOptions id={testInfo.id} />
      </Stack>
      <Stack
        direction="row"
        color={textColorVariant()}
        w="100%"
        align="end"
        justify="space-between"
      >
        <Text
          fontWeight="black"
          fontSize="3rem"
          opacity=".02"
          pos="absolute"
          left="1rem"
          bottom={-4}
        >
          {testInfo.testName}
        </Text>
        <Text
          fontSize=".7rem"
          paddingTop=".2rem"
          fontWeight="medium"
          opacity={0.6}
          color={textColorVariant()}
        >
          {`${moment(testInfo.createdAt).fromNow()}`}
        </Text>
        <Stack color={textColorVariant()} direction="row" spacing={4}>
          <Center
            as={Link}
            href={`${testInfo.id}/statistics`}
            p=".1rem"
            fontSize="1.2rem"
            cursor="pointer"
            opacity=".8"
          >
            <BsBarChartLine />
          </Center>
          <Button
            as={Link}
            href={`${testInfo.id}/scan`}
            p=".5rem 1rem"
            boxShadow="none"
            border={variant === ClassVariant.secondary ? "1px solid" : ""}
            borderColor={
              variant === ClassVariant.secondary ? "palette.button.primary" : ""
            }
            bg={
              variant === ClassVariant.secondary
                ? "transparent"
                : textColorVariant()
            }
            color={textButtonColorVariant()}
            fontSize=".8rem"
            h="fit-content"
            _hover={{
              textDecoration: "none",
            }}
          >
            Open
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
