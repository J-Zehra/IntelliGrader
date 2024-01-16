"use client";

import { Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function ShadingGuide() {
  return (
    <Stack>
      <Text fontSize="1.8rem" fontWeight="bold" opacity={0.8}>
        SHADING GUIDE
      </Text>
      <Text fontWeight="normal" opacity={0.8}>
        In order for IntelliGrader to work as intended, shading must meet
        certain criteria. This guide will show you what is an ideal and
        non-ideal way of shading the papers.
      </Text>
      <Stack pt="2rem">
        <Text fontWeight="bold" opacity={0.8}>
          IDEAL
        </Text>
        <Image src="/tutorial/shading/ideal.png" w="100%" />
        <Text fontSize=".9rem">
          What you can see here is perfection. Of course we are aware that it is
          not always possible to attain this kind of shading, but this is the
          ideal. Always strive to get this shading. It is okay to get a little
          messy and inaccurate, just avoid the non-ideal shading that you will
          learn next.
        </Text>
      </Stack>
      <Stack pt="2rem">
        <Text fontWeight="bold" opacity={0.8}>
          NON-IDEAL
        </Text>
        <Image src="/tutorial/shading/nonIdeal.png" w="100%" />
        <Text fontSize=".9rem">
          Half shaded, 1/4 shaded, lightly shaded, and too messy shaded - These
          are the main shading mistakes that you need to avoid. IntelliGrader
          will most likely mark these circles as unshaded, and we do not want
          that for our answers. Stricly avoid the last example, reason being
          IntelliGrader detects circles, and with all of these scribbles, the
          scanner will have a hard time marking it, let alone recognizing it as
          a circle
        </Text>
      </Stack>
    </Stack>
  );
}
