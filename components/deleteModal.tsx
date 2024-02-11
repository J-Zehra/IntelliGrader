import {
  Box,
  Button,
  Highlight,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function DeleteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [confirmationText, setConfirmationText] = useState("");

  const mutateUser = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: () => {
      return axios.delete("/api/delete-user");
    },
    onSuccess: () => {
      signOut();
    },
  });

  const handleDeleteAccount = () => {
    if (confirmationText === "Delete") {
      mutateUser.mutate();
    }
  };

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
            Deleting account will remove all of its records. Are you sure you
            want to delete?
          </Text>
          <Text fontSize=".9rem" marginTop="1rem">
            <Highlight
              query="Delete"
              styles={{ color: "red", fontWeight: "bold" }}
            >
              Type Delete to confirm.
            </Highlight>
          </Text>
          <Box marginTop="1rem">
            <Input
              placeholder="Delete"
              onChange={(e) => setConfirmationText(e.target.value)}
            />
          </Box>
        </ModalBody>
        <ModalFooter
          as={Stack}
          direction="row"
          align="center"
          justify="start"
          w="100%"
        >
          <Button padding="1.3rem" fontSize=".9rem" bg="red" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            bg="transparent"
            border="1px solid"
            borderColor="red.200"
            color="red"
            padding="1.2rem"
            fontSize=".9rem"
            boxShadow="none"
            isLoading={mutateUser.isLoading}
            loadingText="Deleting..."
            colorScheme="red"
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
