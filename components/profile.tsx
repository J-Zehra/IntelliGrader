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
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Profile() {
  const navigate = useRouter();

  return (
    <Box>
      <Menu autoSelect={false}>
        <MenuButton>
          <Avatar w="2.5rem" h="2.5rem" />
        </MenuButton>
        <MenuList p=".6rem">
          <MenuGroup>
            <Stack direction="row" align="center" w="100%">
              <Button
                onClick={() => navigate.push("/signin")}
                p="0 1rem"
                fontSize=".9rem"
              >
                Signin
              </Button>
              <Button
                p="0 1rem"
                variant="outline"
                onClick={() => navigate.push("/signup")}
                fontSize=".9rem"
              >
                Signup
              </Button>
            </Stack>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup fontSize=".9rem">
            <MenuItem>Docs</MenuItem>
            <MenuItem>FAQ</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}
