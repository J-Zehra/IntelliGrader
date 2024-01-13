/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Center, Stack } from "@chakra-ui/react";
import { ClassNavLink } from "@/utils/types";
import useObserver from "@/hooks/useObserver";
import OverviewCard from "./components/overviewCard";
import RecentScans from "./components/recentScans";

export default function ClassDashboardPage() {
  const { ref } = useObserver(ClassNavLink.home);
  return (
    <Center w="100%">
      <Stack spacing="2rem" w={{ base: "100%", sm: "25rem" }} ref={ref}>
        <OverviewCard />
        <RecentScans />
      </Stack>
    </Center>
  );
}
