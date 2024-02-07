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
  handleDeleteTest,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleDeleteTest: () => void;
}) {
  return (
    <Modal isOpen={isOpen} size="xs" onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalBody>
          <Text fontSize=".9rem">
            Deleting test will remove all of its records.
          </Text>
        </ModalBody>
        <ModalFooter
          as={Stack}
          direction="row"
          align="center"
          justify="start"
          w="100%"
        >
          <Button fontSize=".9rem" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteTest}
            bg="transparent"
            border="1px solid"
            borderColor="palette.accent"
            color="palette.accent"
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
