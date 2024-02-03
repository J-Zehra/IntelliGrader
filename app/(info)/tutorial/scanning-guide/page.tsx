"use client";

import { Image, Stack, Text, Wrap } from "@chakra-ui/react";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function ScanningGuide() {
  const ideals = [
    "The paper is not too far and not too close.",
    "All four corners of the paper is captured.",
    "All markers are captured.",
    "Not blurred.",
    "White background or plain",
    "Well lit.",
  ];

  const idealImages = [
    "/tutorial/scanning/ideal1.jpg",
    "/tutorial/scanning/ideal2.jpg",
  ];
  const nonIdealImages = [
    "/tutorial/scanning/nonIdeal1.jpg",
    "/tutorial/scanning/nonIdeal2.jpg",
    "/tutorial/scanning/nonIdeal3.jpg",
    "/tutorial/scanning/nonIdeal4.jpg",
  ];

  const nonIdeals = [
    "The picture is blurry.",
    "The paper is too far or too close.",
    "Paper can barely be seen due to poor lighting",
    "The picture is upside down or rotated",
    "The background is messy and has too many activity",
  ];
  return (
    <Stack>
      <Text fontSize="1.8rem" fontWeight="bold" opacity={0.8}>
        SCANNING GUIDE
      </Text>
      <Text fontWeight="normal" opacity={0.8}>
        IntilliGrader is not always perfect, and must meet certain conditions to
        work properly. This guide will walk you through what is an ideal and
        non-ideal way of scanning the papers.
      </Text>
      <Stack pt="2rem">
        <Text fontWeight="bold" opacity={0.8}>
          IDEAL
        </Text>
        <Stack>
          {ideals.map((ideal) => {
            return (
              <Stack direction="row" align="center" spacing="1rem">
                <FaCheck />
                <Text fontSize=".9rem">{ideal}</Text>
              </Stack>
            );
          })}
        </Stack>
        <Stack justify="center" w="100%" paddingTop="2rem" direction="row">
          {idealImages.map((image) => {
            return <Image src={image} w="45%" />;
          })}
        </Stack>
      </Stack>
      <Stack pt="2rem">
        <Text fontWeight="bold" opacity={0.8}>
          NON-IDEAL
        </Text>
        <Stack>
          {nonIdeals.map((nonIdeal) => {
            return (
              <Stack direction="row" align="center" spacing="1rem">
                <IoMdClose />
                <Text fontSize=".9rem">{nonIdeal}</Text>
              </Stack>
            );
          })}
        </Stack>
        <Wrap
          justify="center"
          w="100%"
          paddingTop="2rem"
          spacing="1.2rem"
          direction="row"
        >
          {nonIdealImages.map((image) => {
            return <Image src={image} w="40%" />;
          })}
        </Wrap>
      </Stack>
    </Stack>
  );
}
