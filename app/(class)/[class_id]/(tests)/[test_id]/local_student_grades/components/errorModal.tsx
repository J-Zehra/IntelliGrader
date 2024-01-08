import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

export default function ErrorModal({
  isOpen,
  onClose,
  rollNumber,
}: {
  isOpen: boolean;
  onClose: () => void;
  rollNumber: number;
}) {
  return (
    <Modal isOpen={isOpen} size="xs" onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize=".9rem">{`Student with roll number ${rollNumber} does not exist. Check if the number detected is correct or if the student exists`}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
