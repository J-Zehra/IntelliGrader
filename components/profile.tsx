import {
  Avatar,
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
  // useDisclosure,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next13-progressbar";
import ScannerSettingsModal from "./scannerSettingsModal";
import DeleteModal from "./deleteModal";

export default function Profile() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onClose: onDeleteModalClose,
    onOpen: onDeleteModalOpen,
  } = useDisclosure();
  const { data } = useSession();
  const userData = data as any;
  const navigate = useRouter();

  return (
    <Box>
      {isOpen ? (
        <ScannerSettingsModal onClose={onClose} isOpen={isOpen} />
      ) : null}
      {isDeleteModalOpen ? (
        <DeleteModal onClose={onDeleteModalClose} isOpen={isDeleteModalOpen} />
      ) : null}
      <Menu strategy="absolute" placement="right-start" autoSelect={false}>
        <MenuButton>
          <Avatar
            bg="palette.light"
            name={data?.user?.email || ""}
            w="2.5rem"
            h="2.5rem"
            color="palette.button.primary"
          />
        </MenuButton>
        <MenuList p="1rem">
          <Center
            paddingInline="2rem"
            paddingTop="1rem"
            gap="1rem"
            flexDir="column"
          >
            <Text fontSize=".75rem">{userData?.user?.email}</Text>
            <Avatar
              bg="palette.light"
              name={userData?.user?.email || ""}
              w="4rem"
              h="4rem"
              color="palette.button.primary"
            />
            <Text fontSize=".9rem">Hello, {userData?.user?.username}!</Text>
          </Center>
          <MenuDivider mb="1rem" />
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
            <MenuItem borderRadius=".6rem" onClick={onOpen}>
              Scanner Settings
            </MenuItem>
          </MenuGroup>
          <MenuDivider mb="1rem" />
          <MenuGroup>
            <Stack direction="row">
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
              <Button
                onClick={onDeleteModalOpen}
                p="0 1rem"
                borderColor="red.200"
                color="red"
                _hover={{ bg: "rgba(200, 0, 0, .05)" }}
                variant="outline"
                fontSize=".9rem"
              >
                Delete Account
              </Button>
            </Stack>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}
