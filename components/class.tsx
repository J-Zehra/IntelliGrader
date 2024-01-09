import { Button, Center, Stack, Text } from "@chakra-ui/react";
import { BsBarChartLine } from "react-icons/bs";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { ClassVariant, FetchedClassInfo } from "@/utils/types";
import { item as animationItem } from "@/utils/animations";
import { headerState } from "@/state/headerState";
import moment from "moment";
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

  const handleClick = () => {
    setHeader(classInfo.course);
    navigate.push(`/${classInfo.id}/dashboard`);
  };

  return (
    <Stack
      bg={bgVariant()}
      p=".8rem"
      borderRadius="1rem"
      pos="relative"
      overflow="hidden"
      boxShadow="0 2px 5px rgba(0, 0, 50, .2)"
      as={motion.div}
      variants={animationItem}
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
            {classInfo.course}
          </Text>
          <Text fontSize=".75rem" fontWeight="medium" opacity={0.8}>
            {`${classInfo.program} ${classInfo.year}`}
          </Text>
        </Stack>
        <MoreOptions id={classInfo.id} />
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
          {`${classInfo.program} ${classInfo.year}`}
        </Text>
        <Stack
          w="100%"
          direction="row"
          color="palette.background"
          align="center"
          justify="space-between"
        >
          <Text fontSize=".75rem" fontWeight="light" opacity={0.8}>
            {moment(classInfo.createdAt).fromNow()}
          </Text>
          <Stack color={textColorVariant()} direction="row" spacing={4}>
            <Center p=".1rem" fontSize="1.2rem" cursor="pointer" opacity=".8">
              <BsBarChartLine />
            </Center>
            <Button
              bg="palette.background"
              color="palette.text"
              p=".5rem 1rem"
              fontSize=".8rem"
              h="fit-content"
              onClick={handleClick}
            >
              Open
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
