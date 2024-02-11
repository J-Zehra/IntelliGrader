/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next13-progressbar";
import { FaRegCheckCircle } from "react-icons/fa";
import { FetchedTestInfo } from "@/utils/types";

export default function ChooseStudentModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useRouter();
  const { test_id } = useParams();

  const { data: testData } = useQuery({
    queryKey: ["generate-paper"],
    queryFn: async () => {
      let tests: FetchedTestInfo[] = [];
      await axios.get(`/api/tests/generate/${test_id}`).then((res) => {
        tests = res.data;
      });

      return tests;
    },
  });

  const handleGenerate = () => {
    navigate.push("/pdf");
  };

  return (
    <Modal isOpen={isOpen} isCentered size="sm" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          borderTopRadius=".4rem"
          bg="palette.accent"
          paddingBlock="1.5rem"
          color="palette.background"
        >
          Choose Test
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Stack pt={8} spacing={2.5}>
            {testData?.map((test) => {
              return (
                <Stack
                  key={test.id}
                  p=".5rem 1rem"
                  borderRadius=".5rem"
                  direction="row"
                  spacing="1rem"
                  border="1px solid rgba(0, 0, 100, .1)"
                  align="center"
                >
                  <Center>
                    <FaRegCheckCircle />
                  </Center>
                  <Text key={test.id}>{test.testName}</Text>;
                </Stack>
              );
            })}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleGenerate}>Generate</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
