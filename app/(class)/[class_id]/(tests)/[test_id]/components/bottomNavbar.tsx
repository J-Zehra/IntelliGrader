/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { Box, Center, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { TestNavLink } from "@/utils/types";
import { fileState } from "@/state/fileState";
import { navlinks } from "./navlinks";
import ScanButton from "./scanButton";
import FileUploadButton from "./fileUploadButton";

export default function BottomNavbar() {
  const router = useRouter();
  const { class_id, test_id } = useParams();
  const path = usePathname();
  const image = useRecoilValue(fileState);
  const [activeBottomNav, setActiveBottomNav] = useState<TestNavLink>(
    TestNavLink.scan,
  );

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

  useEffect(() => {
    router.prefetch("settings");
    router.prefetch("statistics");
    router.prefetch("student_grades");
  }, [router]);

  if (image.length > 0) {
    return null;
  }

  if (path === `/${class_id}/${test_id}/pdf`) {
    return null;
  }

  return (
    <Center w="100%">
      <Box
        w="90%"
        h="6rem"
        position="fixed"
        bottom="2rem"
        bg="palette.light"
        boxShadow="2px 2px 10px rgba(0, 0, 100, .5)"
        borderRadius="1.3rem"
      >
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
                transition="all .3s ease"
                onClick={() => handleClick(nav.label, nav.link)}
                {...style(nav.label)}
              >
                {nav.icon}
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </Center>
  );
}
