import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function ScannerSettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [threshold, setThreshold] = useState<number>();
  const toast = useToast();

  const { isFetched } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await axios.get("/api/scanner-settings");
      setThreshold(res.data.shading_threshold);

      return res.data;
    },
  });

  const mutateThreshold = useMutation({
    mutationKey: ["edit-threshold"],
    mutationFn: () => {
      return axios.put("/api/set-scanner-settings", { threshold });
    },
    onSuccess: () => {
      toast({
        title: "Successfully Changed.",
        duration: 3000,
        position: "top",
        status: "success",
      });
      onClose();
    },
  });

  const handleSave = () => {
    mutateThreshold.mutate();
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
        <ModalHeader>Scanner Settings</ModalHeader>
        <ModalBody as={Stack}>
          <Text fontSize=".8rem">Shading Threshold</Text>
          <Skeleton isLoaded={isFetched} borderRadius=".5rem">
            <Input
              placeholder="Threshold"
              value={threshold || ""}
              onChange={(e) => setThreshold(parseInt(e.target.value, 10))}
            />
          </Skeleton>
        </ModalBody>
        <ModalFooter
          as={Stack}
          direction="row"
          align="center"
          justify="start"
          w="100%"
        >
          <Button
            padding="1.2rem"
            colorScheme="blue"
            fontSize=".9rem"
            variant="outline"
            borderRadius=".8rem"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            padding="1.2rem"
            isLoading={mutateThreshold.isLoading}
            loadingText="Saving..."
            colorScheme="blue"
            fontSize=".9rem"
            boxShadow="none"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
