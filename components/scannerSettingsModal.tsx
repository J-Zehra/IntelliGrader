import {
  Box,
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
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { MdQuestionMark } from "react-icons/md";

export default function ScannerSettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [threshold, setThreshold] = useState<number>(45);
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
    if (threshold < 25 || threshold > 80) {
      toast({
        title: "Invalid Threshold",
        description: "Recommended threshold value is ranging from 25 to 80",
        duration: 5000,
        position: "top",
        status: "error",
      });
      return;
    }

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
          <Stack direction="row">
            <Text fontSize=".75rem">Shading Threshold</Text>
            <Tooltip
              label="Higher value will be stricter to shading, while lower value will be more tolerant. Valid threshold is between 25 to 80"
              p=".8rem"
              borderRadius=".8rem"
              bg="palette.light"
              fontSize=".75rem"
              color="rgba(0, 0, 50, .7)"
              placement="end-end"
            >
              <Box
                cursor="pointer"
                p=".3rem"
                borderRadius="1rem"
                fontSize=".7rem"
                bg="palette.light"
              >
                <MdQuestionMark />
              </Box>
            </Tooltip>
          </Stack>
          <Skeleton isLoaded={isFetched} borderRadius=".5rem">
            <Input
              placeholder="Threshold"
              type="number"
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
