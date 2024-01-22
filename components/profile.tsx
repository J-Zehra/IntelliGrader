import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  // MenuCommand,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { data } = useSession();
  const navigate = useRouter();

  return (
    <Box>
      <Menu autoSelect={false}>
        <MenuButton>
          <Avatar
            bg="palette.light"
            name={data?.user?.email || ""}
            w="2.5rem"
            h="2.5rem"
            color="palette.button.primary"
          />
        </MenuButton>
        <MenuList p=".6rem">
          {/* <MenuGroup>
            <MenuItem justifyContent="space-between" w="100%">
              Profile
              <MenuCommand>
                <Avatar
                  bg="palette.light"
                  name={data?.user?.email || ""}
                  w="2rem"
                  h="2rem"
                />
              </MenuCommand>
            </MenuItem>
          </MenuGroup>
          <MenuDivider mb="1rem" /> */}
          <MenuGroup fontSize=".9rem">
            <MenuItem
              borderRadius=".6rem"
              onClick={() => navigate.push("/tutorial")}
            >
              Tutorial
            </MenuItem>
            <MenuItem
              borderRadius=".6rem"
              onClick={() => navigate.push("/privacy-policy")}
            >
              Privacy Policy
            </MenuItem>
            <MenuItem
              borderRadius=".6rem"
              onClick={() => navigate.push("/terms-of-service")}
            >
              Terms of Service
            </MenuItem>
          </MenuGroup>
          <MenuDivider mb="1rem" />
          <MenuGroup>
            <Button
              onClick={() => signOut()}
              p="0 1rem"
              borderColor="palette.light"
              color="palette.accent"
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
