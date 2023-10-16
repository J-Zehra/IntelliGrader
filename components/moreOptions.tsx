import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMore } from "react-icons/ai";

export default function MoreOptions() {
  return (
    <Menu>
      <MenuButton>
        <IconButton
          aria-label="More Options"
          p=".3rem"
          h="fit-content"
          w="fit-content"
          minW="0"
          cursor="pointer"
          fontSize="1.2rem"
          opacity=".8"
          bg="transparent"
          _hover={{ bg: "rgba(0, 0, 0, .1)" }}
          borderRadius="2rem"
          onClick={(e) => e.stopPropagation()}
          icon={<AiOutlineMore />}
        />
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
}
