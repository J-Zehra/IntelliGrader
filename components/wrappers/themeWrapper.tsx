"use client";

import { ChakraProvider } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import theme from "@/chakra-ui/theme";

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
