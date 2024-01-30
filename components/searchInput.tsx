import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { IoMdSearch } from "react-icons/io";

export default function SearchInput({
  setSearchTerm,
}: {
  setSearchTerm: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Box>
      <InputGroup>
        <InputLeftElement
          color="palette.button.primary"
          opacity={0.6}
          fontSize="1.2rem"
          h="100%"
          w="3rem"
        >
          <IoMdSearch />
        </InputLeftElement>
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search class or course"
          textIndent="1.2rem"
          borderRadius=".8rem"
          type="text"
          p="1.5rem"
        />
      </InputGroup>
    </Box>
  );
}
