/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next13-progressbar";
import { ClassNavLink } from "@/utils/types";
import { useRecoilState } from "recoil";
import { classActiveNavState } from "@/state/classActiveNav";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { motion } from "framer-motion";
import { navlinks } from "./navlinks";

export default function BottomNavbar() {
  const router = useRouter();
  const { isOpen: isToggled, onToggle } = useDisclosure();
  const [activeBottomNav, setActiveBottomNav] =
    useRecoilState(classActiveNavState);

  const handleChangeNav = (label: ClassNavLink, link: string) => {
    setActiveBottomNav(label);
    router.push(link);
  };

  return (
    <Box
      w={{ base: "85%", sm: "25rem" }}
      h="6rem"
      position="fixed"
      bottom="2rem"
      bg="palette.light"
      boxShadow="5px 5px 10px rgba(0, 0, 100, .08)"
      borderRadius="1.3rem"
      zIndex="overlay"
      as={motion.div}
      initial={{ y: 0 }}
      animate={{
        y: isToggled ? 95 : 0,
      }}
    >
      <Box
        onClick={onToggle}
        pos="absolute"
        top=".5rem"
        opacity={0.6}
        right="1rem"
        fontSize="1.2rem"
        cursor="pointer"
      >
        {isToggled ? (
          <MdOutlineKeyboardArrowUp />
        ) : (
          <MdOutlineKeyboardArrowDown />
        )}
      </Box>
      <Stack
        pos="absolute"
        bottom={0}
        w="100%"
        h="4rem"
        paddingInline={4}
        bg="palette.background"
        borderBottomRadius="1.3rem"
        direction="row"
        align="center"
        fontSize="1.5rem"
        color="palette.text"
        justify="space-around"
      >
        {navlinks.map((nav) => {
          return (
            <Stack
              key={nav.label}
              align="center"
              justify="center"
              spacing={1}
              fontSize="1.3rem"
              transition="all .3s ease"
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
              _active={{ bg: "rgba(0, 0, 200, .05)" }}
              borderRadius="10rem"
              p=".5rem"
              w="3.5rem"
              h="3.5rem"
              opacity={activeBottomNav === nav.label ? 1 : 0.8}
              color={
                activeBottomNav === nav.label
                  ? "palette.accent"
                  : "palette.text"
              }
              onClick={() => handleChangeNav(nav.label, nav.link)}
            >
              {nav.icon}
              <Text fontSize=".75rem">{nav.label}</Text>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
