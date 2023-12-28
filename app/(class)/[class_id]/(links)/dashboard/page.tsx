/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Stack } from "@chakra-ui/react";
import { ClassNavLink } from "@/utils/types";
import useObserver from "@/hooks/useObserver";
import OverviewCard from "./components/overviewCard";
import RecentScans from "./components/recentScans";

export default function ClassDashboardPage() {
  const { ref } = useObserver(ClassNavLink.home);
  return (
    <Stack spacing="2rem" ref={ref}>
      <OverviewCard />
      <RecentScans />
    </Stack>
  );
}
