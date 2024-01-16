/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { Box, Center, Stack, Text, useDisclosure } from "@chakra-ui/react";

import { usePathname, useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { TestNavLink } from "@/utils/types";
import { fileState } from "@/state/fileState";
import { testActiveNavState } from "@/state/testActiveNav";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { motion } from "framer-motion";
import { navlinks } from "./navlinks";
import ScanButton from "./scanButton";
import FileUploadButton from "./fileUploadButton";

export default function BottomNavbar() {
  const router = useRouter();
  const path = usePathname();
  const image = useRecoilValue(fileState);
  const { isOpen: isToggled, onToggle } = useDisclosure();
  const [activeBottomNav, setActiveBottomNav] =
    useRecoilState(testActiveNavState);

  const handleClick = (label: TestNavLink, link: string | undefined) => {
    if (link) {
      setActiveBottomNav(label);
      router.push(link);
    }
  };

  const color = (nav: TestNavLink) => {
    return activeBottomNav === nav ? "palette.accent" : "palette.text";
  };

  const style = (nav: TestNavLink) => {
    return {
      color: nav === TestNavLink.scan ? "palette.background" : color(nav),
    };
  };

  // useEffect(() => {
  //   router.prefetch("settings");
  //   router.prefetch("statistics");
  //   router.prefetch("student_grades");
  // }, [router]);

  if (image.length > 0) {
    return null;
  }

  console.log(path);

  if (
    path.includes("pdf") ||
    path.includes("overview") ||
    path.includes("local_student_grades")
  ) {
    return null;
  }

  return (
    <Center w="100%" zIndex="overlay">
      <Box
        w={{ base: "90%", sm: "25rem" }}
        h="6rem"
        position="fixed"
        bottom="2rem"
        bg="palette.light"
        boxShadow="5px 5px 12px rgba(0, 0, 100, .08)"
        borderRadius="1.3rem"
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
          cursor="pointer"
          right="1rem"
          fontSize="1.2rem"
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
          paddingInline={3}
          bg="palette.background"
          borderBottomRadius="1.3rem"
          direction="row"
          align="center"
          fontSize="1.5rem"
          color="palette.text"
          justify="space-around"
        >
          {navlinks.map((nav) => {
            return nav.label === TestNavLink.scan ? (
              <ScanButton isLoading={false} icon={nav.icon} />
            ) : nav.label === TestNavLink.file ? (
              <FileUploadButton />
            ) : (
              <Stack
                key={nav.label}
                align="center"
                spacing={1}
                cursor="pointer"
                fontSize="1.2rem"
                borderRadius=".6rem"
                _hover={{ opacity: 0.8 }}
                transition="all .3s ease"
                onClick={() => handleClick(nav.label, nav.link)}
                {...style(nav.label)}
              >
                {nav.icon}
                {activeBottomNav === nav.label ? (
                  <Text fontSize=".7rem">{nav.label}</Text>
                ) : null}
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </Center>
  );
}
