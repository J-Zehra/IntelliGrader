import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const { data } = useSession();

  return (
    <Box>
      <Menu autoSelect={false}>
        <MenuButton>
          <Avatar
            bg="palette.light"
            name={data?.user?.email || ""}
            w="2.5rem"
            h="2.5rem"
          />
        </MenuButton>
        <MenuList p=".6rem">
          <MenuGroup fontSize=".9rem">
            <MenuItem>Docs</MenuItem>
            <MenuItem>FAQ</MenuItem>
          </MenuGroup>
          <MenuDivider mb="1rem" />
          <MenuGroup>
            <Button
              onClick={() => signOut()}
              p="0 1rem"
              variant="outline"
              fontSize=".9rem"
            >
              Logout
            </Button>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}
