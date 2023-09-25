import { Button, Stack, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ClassVariant, FetchedTestInfo } from "@/utils/types";
import { container } from "@/utils/animations";
import EmptyTest from "./emptyTest";
import Test from "./test";
import TestsLoading from "../[class_id]/test/[test_id]/components/testsLoading";

export default function Tests() {
  const empty = true;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { class_id } = useParams();

  const getTests = async () => {
    let tests: FetchedTestInfo[] = [];
    await axios.get(`api/tests/class_tests/${class_id}`).then((res) => {
      tests = res.data;
    });

    return tests;
  };

  const { data: testData, isLoading } = useQuery({
    queryKey: ["tests"],
    queryFn: getTests,
  });

  const renderButton = () => {
    if (!empty) {
      <Link href={`${class_id}/test/setup_test`}>
        <Button
          mt={5}
          w="fit-content"
          fontSize=".7rem"
          p=".5rem .8rem"
          leftIcon={<IoMdAdd style={{ fontSize: "1rem" }} />}
        >
          Setup Test
        </Button>
        ;
      </Link>;
    } else return null;
  };

  const renderTests = () => {
    if (isLoading) {
      return <TestsLoading />;
    }

    if (!isLoading && testData && testData?.length < 1) {
      return <EmptyTest />;
    }

    return testData?.map((test) => {
      return (
        <Test testInfo={test} key={test.id} variant={ClassVariant.primary} />
      );
    });
  };

  return (
    <Stack spacing={6} mt={5}>
      <Stack direction="row" w="100%" justify="space-between" align="center">
        <Text fontSize=".8rem" fontWeight="medium">
          Tests
        </Text>
        <Stack
          spacing={3}
          as={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {renderButton()}
        </Stack>
      </Stack>
      {renderTests()}
    </Stack>
  );
}
