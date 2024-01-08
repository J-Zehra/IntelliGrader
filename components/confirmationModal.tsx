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
    <Modal isOpen={isOpen} size="xs" onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
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
          <Button
            bg="transparent"
            border="1px solid"
            borderColor="palette.accent"
            color="palette.accent"
            onClick={onClose}
            fontSize=".9rem"
            boxShadow="none"
          >
            Cancel
          </Button>
          <Button fontSize=".9rem" onClick={handleDeleteClass}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
