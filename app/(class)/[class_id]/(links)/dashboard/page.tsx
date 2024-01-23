/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Center, Image, Stack, useMediaQuery } from "@chakra-ui/react";
import { ClassNavLink } from "@/utils/types";
import useObserver from "@/hooks/useObserver";
import OverviewCard from "./components/overviewCard";
import RecentScans from "./components/recentScans";

export default function ClassDashboardPage() {
  const { ref } = useObserver(ClassNavLink.home);
  const [isDesktopLayout] = useMediaQuery("(min-width: 40em)");
  return (
    <Stack w="100%" direction="row" spacing="10rem" paddingTop="1rem">
      <Stack
        spacing="2rem"
        flex={1}
        w={{ base: "100%", sm: "25rem" }}
        ref={ref}
      >
        <OverviewCard />
        <RecentScans />
      </Stack>
      {isDesktopLayout ? (
        <Center flex={1}>
          <Image src="/illustrations/teacher.svg" w="80%" opacity={0.8} />
        </Center>
      ) : null}
    </Stack>
  );
}
