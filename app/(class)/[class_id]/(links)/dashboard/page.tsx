"use client";

import { Stack } from "@chakra-ui/react";
import OverviewCard from "./components/overviewCard";
import RecentScans from "./components/recentScans";

export default function ClassDashboardPage() {
  return (
    <Stack spacing="2rem">
      <OverviewCard />
      <RecentScans />
    </Stack>
  );
}
