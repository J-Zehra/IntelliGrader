/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import {
  Box,
  Center,
  IconButton,
  Image,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { MdDeleteOutline } from "react-icons/md";
import Lottie from "react-lottie-player";
import { fileState } from "@/state/fileState";
// import { AiOutlineRotateLeft } from "react-icons/ai";
// import html2canvas from "html2canvas";
import ScanningAnimation from "../../../../../../public/scanning_animation_2.json";
import GradeButton from "./grade";
import AddMoreButton from "./addMoreButton";

export default function Preview() {
  const [files, setFiles] = useRecoilState(fileState);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = (url: string) => {
    setFiles((prev) => prev.filter((item) => item.imageUrl !== url));
  };
  // const imageRef = useRef<HTMLImageElement>();

  // useEffect(() => {
  //   const rotateImage = async () => {
  //     // Use html2canvas to capture the rotated image as a canvas
  //     const canvas = await html2canvas(imageRef!.current!);

  //     // Convert the canvas to a data URL
  //     const dataUrl = canvas.toDataURL("image/jpeg");

  //     // Convert the data URL to a Blob
  //     const blob = await fetch(dataUrl).then((res) => res.blob());

  //     // Create a File from the Blob
  //     const file = new File([blob], "rotated_image.jpeg", {
  //       type: "image/jpeg",
  //     });

  //     // Set the File in the component state
  //     setFiles([{ image: file, imageUrl: URL.createObjectURL(file) }]);
  //   };
  //   rotateImage();
  // }, [rotation, setFiles]);

  return (
    <Stack pb="2rem">
      <Wrap
        padding=".5rem"
        justify="start"
        align="center"
        w="100%"
        pos="relative"
        borderRadius=".5rem"
      >
        {files.map((file) => {
          return (
            <WrapItem
              key={file.imageUrl}
              pos="relative"
              w={
                files.length === 1
                  ? "100%"
                  : files.length === 2
                  ? "48%"
                  : files.length === 3
                  ? "30%"
                  : "23%"
              }
            >
              <Box pos="absolute" top={0} right={0}>
                <IconButton
                  aria-label="Remove"
                  variant="outline"
                  bg="palette.light"
                  opacity={0.75}
                  color="red.500"
                  fontSize="1.3rem"
                  onClick={() => handleDelete(file.imageUrl)}
                  icon={<MdDeleteOutline />}
                />
              </Box>
              <Image
                borderRadius=".5rem"
                src={file.imageUrl}
                w="100%"
                boxShadow="2px 2px 10px rgba(0, 0, 100, .1)"
                opacity={loading ? 0.3 : 1}
              />
            </WrapItem>
          );
        })}
        {loading ? (
          <Center
            pos="absolute"
            w="100%"
            flexDir="column"
            zIndex={10}
            h="100%"
            left={0}
            top={0}
          >
            <Lottie
              loop
              animationData={ScanningAnimation}
              play
              style={{ width: 200, height: 200 }}
            />
          </Center>
        ) : null}
      </Wrap>

      {/* {files.length === 1 ? (
        <Stack w="100%" align="center">
          <IconButton
            fontSize="1.2rem"
            color="palette.button.primary"
            borderColor="palette.light"
            aria-label="Rotate"
            variant="outline"
            onClick={() =>
              setRotation((prev) => {
                if (prev === 270) return 0;
                return prev + 90;
              })
            }
            w="fit-content"
            icon={<AiOutlineRotateLeft />}
          />
        </Stack>
      ) : null} */}

      <Stack direction="row" justify="end" align="center" spacing={2.5} pt={5}>
        <IconButton
          aria-label="Delete Icon"
          variant="ghost"
          fontSize="1.5rem"
          color="palette.accent"
          onClick={() => setFiles([])}
          icon={<MdDeleteOutline />}
        />
        <AddMoreButton />
        <GradeButton setLoading={setLoading} />
      </Stack>
    </Stack>
  );
}
