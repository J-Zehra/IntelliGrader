import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IoMdSearch } from "react-icons/io";

export default function SearchInput({
  setSearchTerm,
  refetch,
}: {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<any, unknown>>;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const delaySearch = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(delaySearch);
  };

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
          onChange={handleChange}
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
