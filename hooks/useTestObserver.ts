"use client";

import { testActiveNavState } from "@/state/testActiveNav";
import { TestNavLink } from "@/utils/types";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";

function useTestObserver(link: TestNavLink) {
  const setActiveNav = useSetRecoilState(testActiveNavState);

  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      setActiveNav(link);
    }
  }, [ref, isInView, setActiveNav, link]);

  return { ref };
}

export default useTestObserver;
