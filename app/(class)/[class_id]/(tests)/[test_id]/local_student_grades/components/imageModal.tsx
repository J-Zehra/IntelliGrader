import {
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

export default function ImageModal({
  isOpen,
  onClose,
  image,
}: {
  isOpen: boolean;
  onClose: () => void;
  image: string;
}) {
  return (
    <Modal
      isOpen={isOpen}
      size="full"
      allowPinchZoom
      onClose={onClose}
      isCentered
      motionPreset="none"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody w="100%" h="100%" p={0} as={Center}>
          <Image src={image} w="100%" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
