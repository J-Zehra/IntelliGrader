"use client";

import { Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function TestGuide() {
  return (
    <Stack>
      <Text fontSize="1.8rem" fontWeight="bold" opacity={0.8}>
        TEST CREATION GUIDE
      </Text>
      <Text fontWeight="normal" opacity={0.8}>
        The IntelliGrader test format has 4 parts. In every part, there is a
        maximum of 25 items or number of questions you can allocate. Number of
        choices is capped at 10. Here is the visual structure of the paper.
      </Text>
      <Image src="/tutorial/test/part_structure.jpg" w="100%" />
      <Text fontWeight="semibold" opacity={0.8} marginTop="1rem">
        How can you create a 25+ items test with one part you say?
      </Text>
      <Text fontWeight="normal" opacity={0.8}>
        The answer is you can&apos;t, but you can still achive it by being
        creative with the use of other parts.
      </Text>
      <Text fontWeight="normal" opacity={0.8}>
        Let&apos;s say you want to create a 40-item questions, then the way to
        do it is by creating a 2-part test with 25 items on the first part and
        15 items on the second part. Here are other ways to create it:
      </Text>
      <Stack borderRadius="1rem" marginBlock="1rem" bg="palette.light" p="1rem">
        <Text fontWeight="medium" opacity={0.8}>
          2 parts - 20 items + 20 items
        </Text>
        <Text fontWeight="medium" opacity={0.8}>
          3 parts - 10 items + 10 items + 20 items
        </Text>
        <Text fontWeight="medium" opacity={0.8}>
          4 parts - 10 items + 10 items + 10 items
        </Text>
        <Text fontWeight="medium" opacity={0.8}>
          ...
        </Text>
      </Stack>
      <Text fontWeight="normal" opacity={0.8}>
        So many ways of achieving it. You can be creative! It&apos;s up to you!
      </Text>
    </Stack>
  );
}
