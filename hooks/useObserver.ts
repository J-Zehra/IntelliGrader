"use client";

import { classActiveNavState } from "@/state/classActiveNav";
import { ClassNavLink } from "@/utils/types";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";

function useObserver(link: ClassNavLink) {
  const setActiveNav = useSetRecoilState(classActiveNavState);

  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      setActiveNav(link);
    }
  }, [ref, isInView, setActiveNav, link]);

  return { ref };
}

export default useObserver;
