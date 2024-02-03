/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Stack } from "@chakra-ui/react";
import { ClassNavLink } from "@/utils/types";
import useObserver from "@/hooks/useObserver";
import OverviewCard from "./components/overviewCard";
import RecentScans from "./components/recentScans";

export default function ClassDashboardPage() {
  const { ref } = useObserver(ClassNavLink.home);
  // const [isDesktopLayout] = useMediaQuery("(min-width: 40em)");
  return (
    <Stack
      w="100%"
      direction="row"
      spacing="10rem"
      justify="center"
      paddingTop=".5rem"
    >
      <Stack spacing="1.5rem" w={{ base: "100%", sm: "40rem" }} ref={ref}>
        <OverviewCard />
        <RecentScans />
      </Stack>
      {/* {isDesktopLayout ? (
        <Center flex={1}>
          <Image src="/illustrations/teacher.svg" w="80%" opacity={0.8} />
        </Center>
      ) : null} */}
    </Stack>
  );
}
