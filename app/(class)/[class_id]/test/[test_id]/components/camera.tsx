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
        <DrawerBody bg="red">
          <Webcam
            videoConstraints={{ facingMode: "user" }}
            height="100%"
            width="100%"
            mirrored
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
