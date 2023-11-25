"use client";

import { Button, Stack } from "@chakra-ui/react";
import { RiAiGenerate } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const navigate = useRouter();
  // const {
  //   isOpen: isGenerateModalOpen,
  //   onClose: onGenerateModalClose,
  //   onOpen: onGenerateModalOpen,
  // } = useDisclosure();

  const handleGenerate = () => {
    navigate.push("pdf");
  };

  return (
    <Stack>
      <Button
        w="100%"
        bg="transparent"
        color="palette.accent"
        border="1px solid"
        borderColor="palette.accent"
        boxShadow="none"
        onClick={handleGenerate}
        leftIcon={<RiAiGenerate />}
      >
        Generate Test Paper
      </Button>
      {/* {isGenerateModalOpen ? (
        <ChooseStudentModal
          isOpen={isGenerateModalOpen}
          onClose={onGenerateModalClose}
        />
      ) : null} */}
    </Stack>
  );
}
