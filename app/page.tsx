"use client";

import { Button, Stack, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ClassesList from "@/components/classesList";
import ClassLoading from "@/components/classLoading";
import CustomContainer from "@/components/reusables/customContainer";
import EmptyClass from "@/components/emptyClass";

export default function Home() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("/api/classes", {
        method: "PUT",
      });
      const classes = res.json();

      return classes;
    },
  });

  const renderClasses = () => {
    if (isLoading) {
      return <ClassLoading />;
    }

    if (isSuccess && data.length < 1) return <EmptyClass />;

    if (isSuccess && data.length > 0) return <ClassesList classesData={data} />;
  };

  return (
    <CustomContainer>
      <Stack pt="7rem" spacing={10}>
        <Stack w="100%" align="center" direction="row" justify="space-between">
          <Text fontSize=".9rem" fontWeight="semibold" opacity=".8">
            All classes
          </Text>
          <Link href="/create">
            <Button
              w="fit-content"
              leftIcon={<IoMdAdd style={{ fontSize: "1rem" }} />}
              fontSize=".8rem"
              size="sm"
              p="1.2rem 1rem"
              boxShadow="none"
            >
              New
            </Button>
          </Link>
        </Stack>
        {renderClasses()}
      </Stack>
    </CustomContainer>
  );
}
