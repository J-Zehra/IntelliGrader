"use client";

import React from "react";
import { ClassNavLink } from "@/utils/types";
import useObserver from "@/hooks/useObserver";
import Tests from "./components/tests";

export default function TestsPage() {
  const { ref } = useObserver(ClassNavLink.tests);
  return (
    <div ref={ref}>
      <Tests />
    </div>
  );
}
