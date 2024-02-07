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
import Lottie from "react-lottie-player";
import { queryClient } from "@/components/wrappers/queryWrapper";
import Link from "next/link";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdInformation } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import loadingAnimation from "../../../../../public/signing_up.json";
import ConfirmationModal from "./confirmationModa";

export default function MoreOptions({ id }: { id: string }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const deleteTest = (testId: string) => {
    return axios.delete(`/api/delete_test/${testId}`);
  };

  const mutateTest = useMutation({
    mutationFn: deleteTest,
    mutationKey: ["delete-test", id],
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["tests"], (oldData) => {
        const newData = (oldData as any[]).filter(
          (item) => item.id !== data.id,
        );
        return newData;
      });
      onClose();
    },
  });

  const handleDeleteTest = () => {
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
          handleDeleteTest={handleDeleteTest}
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
            <Link href={`${id}/about`}>
              <MenuItem
                fontSize=".9rem"
                color="palette.button.primary"
                icon={<IoMdInformation />}
              >
                About
              </MenuItem>
            </Link>
            <Link href={`${id}/student_grades`}>
              <MenuItem
                fontSize=".9rem"
                color="palette.button.primary"
                icon={<CiStar />}
              >
                Graded Tests
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
