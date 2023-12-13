/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ClassNavLink } from "@/utils/types";
import { navlinks } from "./navlinks";

export default function BottomNavbar() {
  const { class_id } = useParams();
  const router = useRouter();
  const [activeBottomNav, setActiveBottomNav] = useState<ClassNavLink>(
    ClassNavLink.home,
  );

  const handleChangeNav = (label: ClassNavLink, link: string) => {
    setActiveBottomNav(label);
    router.push(link);
  };

  useEffect(() => {
    router.prefetch(`/${class_id}/dashboard`);
    router.prefetch(`/${class_id}/tests`);
    router.prefetch(`/${class_id}/students`);
    router.prefetch(`/${class_id}/statistics`);
  }, [class_id, router]);

  return (
    <Box
      w="85%"
      h="6rem"
      position="fixed"
      bottom="2rem"
      bg="palette.light"
      boxShadow="2px 2px 8px rgba(0, 0, 100, .2)"
      borderRadius="1.3rem"
    >
      <Stack
        pos="absolute"
        bottom={0}
        w="100%"
        h="4rem"
        paddingInline={2}
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
              spacing={1}
              transition="all .3s ease"
              color={
                activeBottomNav === nav.label
                  ? "palette.accent"
                  : "palette.text"
              }
              onClick={() => handleChangeNav(nav.label, nav.link)}
            >
              {nav.icon}
              {activeBottomNav === nav.label ? (
                <Text fontSize=".8rem">{nav.label}</Text>
              ) : null}
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
