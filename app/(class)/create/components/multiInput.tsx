import { Textarea } from "@chakra-ui/react";

export default function MultiInput() {
  return (
    <Textarea
      placeholder="Add Student"
      disabled
      bg="gray.100"
      h="6rem"
      p="1rem"
    >
      {/* <Tag size="md" borderRadius="full" variant="solid" colorScheme="green">
        <TagLabel>Green</TagLabel>
        <TagCloseButton />
      </Tag> */}
    </Textarea>
  );
}
