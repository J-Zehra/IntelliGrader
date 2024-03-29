import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";
import { BsBarChartLine } from "react-icons/bs";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { ClassVariant, FetchedClassInfo } from "@/utils/types";
import { item as animationItem } from "@/utils/animations";
import { headerState } from "@/state/headerState";
import moment from "moment";
import { useRouter } from "next13-progressbar";
import MoreOptions from "./moreOptions";

export default function Class({
  variant,
  classInfo,
}: {
  variant: ClassVariant;
  classInfo: FetchedClassInfo;
}) {
  const setHeader = useSetRecoilState(headerState);
  const navigate = useRouter();

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

  const handleClick = () => {
    setHeader(classInfo.course);
    navigate.push(`/${classInfo.id}/dashboard`);
  };

  return (
    <Stack
      bg={bgVariant()}
      p=".8rem 1rem"
      display="flex"
      flexDirection="column"
      borderRadius="1rem"
      pos="relative"
      border={variant === ClassVariant.secondary ? "1px solid" : ""}
      borderColor={variant === ClassVariant.secondary ? "palette.light" : ""}
      w={{ base: "100%", sm: "20rem" }}
      boxShadow={
        variant !== ClassVariant.secondary
          ? "2px 2px 8px rgba(0, 0, 50, .1)"
          : ""
      }
      as={motion.div}
      variants={animationItem}
    >
      <Box pos="absolute" bottom={0} left="1rem">
        <Text fontWeight="black" fontSize="3rem" opacity=".02">
          {`${classInfo.program} ${classInfo.year}`}
        </Text>
      </Box>
      <Stack
        direction="row"
        w="100%"
        color={textColorVariant()}
        justify="space-between"
        align="start"
      >
        <Stack spacing={0.1}>
          <Text fontWeight="semibold" fontSize="1rem">
            {classInfo.course}
          </Text>
          <Text fontSize=".7rem" fontWeight="medium" opacity={0.8}>
            {`${classInfo.program} ${classInfo.year} - ${classInfo.section}`}
          </Text>
        </Stack>
        <MoreOptions id={classInfo.id} />
      </Stack>
      <Stack direction="row" align="end" justify="end">
        <Stack
          w="100%"
          direction="row"
          color="palette.background"
          align="center"
          justify="space-between"
        >
          <Text
            fontSize=".6rem"
            alignSelf="end"
            color={textColorVariant()}
            opacity={0.8}
          >
            {moment(classInfo.createdAt).fromNow()}
          </Text>
          <Stack
            alignItems="end"
            color={textColorVariant()}
            direction="row"
            spacing="1.6rem"
          >
            <Center
              p=".1rem"
              fontSize="1.2rem"
              cursor="pointer"
              opacity=".8"
              borderRadius=".5rem"
              onClick={() => navigate.push(`/${classInfo.id}/statistics`)}
            >
              <BsBarChartLine />
            </Center>
            <Button
              border={variant === ClassVariant.secondary ? "1px solid" : ""}
              boxShadow="none"
              color={textButtonColorVariant()}
              p=".5rem 1rem"
              fontSize=".8rem"
              h="fit-content"
              transition="all .3 ease"
              _hover={{ opacity: 0.8 }}
              onClick={handleClick}
              bg={
                variant === ClassVariant.secondary
                  ? "transparent"
                  : textColorVariant()
              }
              borderColor={
                variant === ClassVariant.secondary
                  ? "palette.button.primary"
                  : ""
              }
            >
              Open
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
