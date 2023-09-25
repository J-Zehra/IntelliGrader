"use client";

import { Button, Link, Stack, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
// import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import ClassesList from "@/components/classesList";
import ClassLoading from "@/components/classLoading";
import CustomContainer from "@/components/reusables/customContainer";
import EmptyClass from "@/components/emptyClass";
import { FetchedClassInfo } from "@/utils/types";

export default function Home() {
  // const { data, isLoading, isSuccess } = useQuery({
  //   queryKey: ["classes"],
  //   queryFn: async () => {
  //     const res = await fetch("/api/classes", {
  //       cache: "no-store",
  //       next: { revalidate: 0 },
  //     });
  //     const classes = res.json();
  //     console.log(classes);

  //     return classes;
  //   },
  //   cacheTime: 0,
  //   staleTime: 0,
  // });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<FetchedClassInfo[]>([]);

  useEffect(() => {
    const getClasses = async () => {
      setIsLoading(true);
      const res = await axios("/api/classes");
      setIsLoading(false);
      setSuccess(true);
      const classes = res.data as unknown as FetchedClassInfo[];
      console.log(classes);
      setData(classes);
    };

    getClasses();
  }, []);

  console.log(data);

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
