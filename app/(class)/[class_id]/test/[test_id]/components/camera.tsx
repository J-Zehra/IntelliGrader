/* eslint-disable react/no-array-index-key */
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import Webcam from "react-webcam";

export default function Camera({
  onClose,
  isOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody bg="red" pos="relative">
          <Webcam
            videoConstraints={{ facingMode: "user" }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            mirrored
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
