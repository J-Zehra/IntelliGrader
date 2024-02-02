/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */

"use client";

import {
  Button,
  Center,
  Collapse,
  Highlight,
  IconButton,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { FetchedGradeInfo } from "@/utils/types";
import { localGradeInfo } from "@/state/localGradeInfo";
import Loading from "@/components/loading";
import { failedToScan } from "@/state/failedToScan";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiCircleQuestion } from "react-icons/ci";
import StudentGradeItemRest from "./components/studentGradeItemRest";
import StudentGradeItem from "./components/studentGradeItem";
import ImageModal from "./components/imageModal";
import { createURL } from "../components/createUrl";

export default function LocalStudentGrades() {
  const { test_id, class_id } = useParams();
  const toast = useToast();
  const navigate = useRouter();
  const localGrade = useRecoilValue(localGradeInfo);
  const failedScan = useRecoilValue(failedToScan);
  const [selectedImage, setSelectedImage] = useState<Buffer>();
  const [isNoteOpen, setIsNoteOpen] = useState(true);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const createStudentGrade = (grades: FetchedGradeInfo[]) => {
    const data = { testId: test_id, grades, classId: class_id };
    return axios.post("/api/create_student_grade", data);
  };

  const mutateStudentGrade = useMutation({
    mutationFn: createStudentGrade,
    mutationKey: ["create-student-grade", test_id],
    onSuccess: () => {
      toast({
        title: "Successly saved",
        status: "success",
        duration: 3000,
        position: "top",
      });
      navigate.push("student_grades");
    },
  });

  const handleSave = () => {
    mutateStudentGrade.mutate(localGrade);
  };

  const [isDesktopLayout] = useMediaQuery("(min-width: 40em)");

  useEffect(() => {
    const timer = setInterval(() => {
      setIsNoteOpen(false);
    }, 20000);

    return () => {
      clearInterval(timer);
    };
  }, [isNoteOpen]);

  return (
    <Center w="100%">
      <Stack
        spacing={2}
        paddingBottom="2rem"
        w={isDesktopLayout ? "40rem" : "100%"}
      >
        {mutateStudentGrade.isLoading ? (
          <Loading message="Saving..." />
        ) : (
          <>
            <Stack
              direction="row"
              w="100%"
              justify="space-between"
              align="center"
            >
              <Text fontSize=".8rem" fontWeight="normal">
                Total of {localGrade.length}
                {localGrade.length < 2 ? " paper" : " papers"}
              </Text>
            </Stack>
            <Stack>
              <Center w="100%" justifyContent="end">
                <IconButton
                  variant={isNoteOpen ? "solid" : "outline"}
                  aria-label="Note"
                  fontSize="1.4rem"
                  borderColor="palette.light"
                  icon={<CiCircleQuestion />}
                  onClick={() => setIsNoteOpen((prev) => !prev)}
                />
              </Center>
              <Collapse in={isNoteOpen}>
                <Stack
                  borderRadius="1rem"
                  bg="palette.light"
                  spacing="1rem"
                  p="1rem"
                >
                  <Text fontSize=".9rem">
                    <Highlight query="NOTE:" styles={{ fontWeight: "bold" }}>
                      NOTE: Make sure to save all of your scanned test papers
                      before leaving this page.
                    </Highlight>
                  </Text>
                </Stack>
              </Collapse>
            </Stack>
            <Stack marginTop={3} spacing={3} marginBottom="1rem">
              {localGrade.map((grades: FetchedGradeInfo, index) => {
                return index === 0 ? (
                  <StudentGradeItem grade={grades} key={grades.roll_number} />
                ) : (
                  <StudentGradeItemRest
                    grade={grades}
                    key={grades.roll_number}
                  />
                );
              })}
            </Stack>
            {localGrade.length > 0 ? (
              <Button onClick={handleSave}>Save Successful Scans</Button>
            ) : null}
            {failedScan.length > 0 ? (
              <Stack paddingTop="2rem">
                <Text fontSize=".8rem" fontWeight="normal">
                  Failed To Scan
                </Text>
                <Wrap justify="start" gap="1rem">
                  {failedScan.map((item: { status: string; image: Buffer }) => {
                    return (
                      <WrapItem
                        onClick={() => {
                          setSelectedImage(item.image);
                          onOpen();
                        }}
                      >
                        <Image
                          src={createURL(item.image)}
                          width={600}
                          height={600}
                          alt="Failed Scan Image"
                          style={{ width: "5rem", borderRadius: "1rem" }}
                        />
                      </WrapItem>
                    );
                  })}
                </Wrap>
              </Stack>
            ) : null}
          </>
        )}
      </Stack>
      {isOpen ? (
        <ImageModal
          image={createURL(selectedImage!)}
          isOpen={isOpen}
          onClose={onClose}
        />
      ) : null}
    </Center>
  );
}
