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
        <MenuList p="1rem">
          <MenuGroup>
            <Stack direction="row" align="center">
              <Button onClick={() => navigate.push("/signin")}>Signin</Button>
              <Button
                variant="outline"
                onClick={() => navigate.push("/signup")}
              >
                Signup
              </Button>
            </Stack>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem>Docs</MenuItem>
            <MenuItem>FAQ</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}
