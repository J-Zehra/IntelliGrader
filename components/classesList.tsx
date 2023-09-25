import { Button, Stack, Text, Link } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import { ClassVariant, FetchedClassInfo } from "@/utils/types";
import { headerState } from "@/state/headerState";
import { container, item as animationItem } from "@/utils/animations";
import CustomContainer from "./reusables/customContainer";
import Class from "./class";
import ClassLoading from "./classLoading";

export default function ClassesList() {
  const setHeader = useSetRecoilState(headerState);

  const getClasses = async () => {
    let classes: FetchedClassInfo[] = [];
    await axios.get("/api/classes").then((res) => {
      classes = res.data;
    });

    return classes;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });

  const renderClasses = () => {
    if (isLoading) {
      return <ClassLoading />;
    }

    if (isError) {
      return <div>Error loading classes</div>;
    }

    return (
      <Stack
        spacing={3}
        as={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/${item.id}`}
            as={motion.a}
            variants={animationItem}
            onClick={() => setHeader(item.subject)}
          >
            <Class variant={ClassVariant.primary} classInfo={item} />
          </Link>
        ))}
      </Stack>
    );
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
