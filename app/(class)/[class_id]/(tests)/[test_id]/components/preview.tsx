/* eslint-disable no-nested-ternary */
import {
  Center,
  // CircularProgress,
  // CircularProgressLabel,
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
import ScanningAnimation from "../../../../../../public/scanning_animation_2.json";
import GradeButton from "./grade";
import AddMoreButton from "./addMoreButton";
// import { socket } from "../socket";

export default function Preview() {
  const [files, setFiles] = useRecoilState(fileState);
  const [loading, setLoading] = useState<boolean>(false);
  // const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const onProgress = (data: any) => {
  //     setIndex(data.index);
  //     console.log("INDEX", data.index);
  //   };

  //   socket.on("progress", onProgress);

  //   return () => {
  //     socket.off("progress", onProgress);
  //   };
  // }, []);

  // console.log("INDEX STATE", index);

  return (
    <Stack>
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
              <Image
                borderRadius=".5rem"
                src={file.imageUrl}
                w="100%"
                boxShadow="2px 2px 10px rgba(0, 0, 100, .1)"
                opacity={loading ? 0.3 : 1}
              />
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
                  {/* <CircularProgress
                    value={Math.round((index / files.length) * 100)}
                    size="5rem"
                    color="blue"
                  >
                    <CircularProgressLabel
                      fontWeight="bold"
                      color="palette.accent"
                    >{`${index}/${files.length}`}</CircularProgressLabel>
                  </CircularProgress> */}
                </Center>
              ) : null}
            </WrapItem>
          );
        })}
      </Wrap>

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
