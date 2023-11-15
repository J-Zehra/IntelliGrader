"use client";

import { Box, IconButton, Stack, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { headerState } from "@/state/headerState";
import CustomContainer from "../reusables/customContainer";

export default function ClassLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useRouter();
  const pathName = usePathname();

  const header = useRecoilValue(headerState);
  const [headerTitle, setHeaderTitle] = useState<string>();

  const segments = pathName.split("/").filter(Boolean);

  useEffect(() => {
    if (segments[0] && !segments[1]) {
      setHeaderTitle(header);
    } else if (segments[2] === "setup_test") {
      setHeaderTitle("Setup Test");
    } else if (segments[2] !== "setup_test") {
      setHeaderTitle("Final Examination");
    }
  }, [header, segments]);

  return (
    <CustomContainer>
      <Stack pt="6.5rem" spacing="2.5rem" h="100vh">
        <Stack w="100%" direction="row" justify="space-between" align="center">
          <IconButton
            aria-label="Return"
            p=".5rem"
            variant="ghost"
            fontSize="1.2rem"
            color="palette.button.primary"
            cursor="pointer"
            borderRadius=".2rem"
            onClick={() => navigate.push("/")}
          >
            <BsArrowReturnLeft />
          </IconButton>
          <Stack direction="row" align="center">
            <Text
              fontSize=".9rem"
              color="palette.button.primary"
              fontWeight="semibold"
              opacity=".8"
            >
              {headerTitle}
            </Text>
            <Box w=".5rem" h=".5rem" bg="palette.accent" borderRadius="5rem" />
          </Stack>
        </Stack>
        <Box h="100%">{children}</Box>
      </Stack>
    </CustomContainer>
  );
}
