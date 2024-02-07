import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function ConfirmationModal({
  isOpen,
  onClose,
  handleDeleteClass,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleDeleteClass: () => void;
}) {
  return (
    <Modal
      preserveScrollBarGap
      isOpen={isOpen}
      size="xs"
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent padding="0">
        <ModalHeader>Confirmation</ModalHeader>
        <ModalBody>
          <Text fontSize=".9rem">
            Deleting class will remove all of its records.
          </Text>
        </ModalBody>
        <ModalFooter
          as={Stack}
          direction="row"
          align="center"
          justify="start"
          w="100%"
        >
          <Button padding="1.3rem" fontSize=".9rem" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteClass}
            bg="transparent"
            border="1px solid"
            borderColor="palette.accent"
            color="palette.accent"
            padding="1.2rem"
            fontSize=".9rem"
            boxShadow="none"
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
