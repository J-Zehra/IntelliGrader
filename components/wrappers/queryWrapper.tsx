"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function QueryWrapper({ children }: { children: ReactNode }) {
  queryClient.invalidateQueries(["classes"]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
