/* eslint-disable @typescript-eslint/naming-convention */
import {
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Lottie from "react-lottie-player";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import loadingAnimation from "../public/signing_up.json";
import { queryClient } from "./wrappers/queryWrapper";
import ConfirmationModal from "./confirmationModal";

export default function MoreOptions({ id }: { id: string }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const deleteClass = (classId: string) => {
    return axios.delete(`/api/delete_class/${classId}`);
  };

  const mutateTest = useMutation({
    mutationFn: deleteClass,
    mutationKey: ["delete-class", id],
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["classes"], (oldData) => {
        const newData = (oldData as any[]).filter(
          (item) => item.id !== data.id,
        );
        return newData;
      });
      onClose();
    },
  });

  const handleDeleteClass = () => {
    mutateTest.mutate(id);
  };

  if (mutateTest.isLoading) {
    return (
      <Lottie
        loop
        animationData={loadingAnimation}
        play
        style={{ width: 30, height: 30 }}
      />
    );
  }

  return (
    <>
      {isOpen ? (
        <ConfirmationModal
          handleDeleteClass={handleDeleteClass}
          isOpen={isOpen}
          onClose={onClose}
        />
      ) : null}
      <Menu>
        <MenuButton>
          <Center cursor="pointer" zIndex={10}>
            <HiOutlineDotsVertical />
          </Center>
        </MenuButton>
        <MenuList>
          <MenuGroup>
            <Link href={`/${id}/setup_test`}>
              <MenuItem
                fontSize=".9rem"
                color="palette.button.primary"
                icon={<FaPlus />}
              >
                Add Tests
              </MenuItem>
            </Link>
            <Link href={`/${id}/students`}>
              <MenuItem
                fontSize=".9rem"
                color="palette.button.primary"
                icon={<FaPlus />}
              >
                Add Students
              </MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider mb="1rem" />
          <MenuGroup>
            <MenuItem
              color="red.500"
              icon={<MdDeleteOutline />}
              fontSize=".9rem"
              onClick={onOpen}
            >
              Delete
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </>
  );
}
