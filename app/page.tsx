"use client";

import { Button, Stack, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ClassesList from "@/components/classesList";
import ClassLoading from "@/components/classLoading";
import CustomContainer from "@/components/reusables/customContainer";
import EmptyClass from "@/components/emptyClass";
import { motion } from "framer-motion";
import SearchInput from "@/components/searchInput";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading, isSuccess, refetch, isRefetching } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axios.put("/api/classes", { searchTerm });

      return res.data;
    },
  });

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [refetch, searchTerm]);

  const renderClasses = () => {
    if (isLoading || isRefetching) {
      return <ClassLoading />;
    }

    if (isSuccess && data.length < 1) return <EmptyClass />;

    if (isSuccess && data.length > 0) return <ClassesList classesData={data} />;
  };

  console.log(data);

  return (
    <CustomContainer>
      <Stack pt="5rem" spacing={8} pb="2rem">
        <Stack
          w="100%"
          align="center"
          direction="row"
          justify="space-between"
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
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
        <SearchInput setSearchTerm={setSearchTerm} />
        {renderClasses()}
      </Stack>
    </CustomContainer>
  );
}
