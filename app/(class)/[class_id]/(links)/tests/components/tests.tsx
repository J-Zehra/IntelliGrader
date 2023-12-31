/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Stack, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ClassVariant, FetchedTestInfo } from "@/utils/types";
import EmptyTest from "@/app/(class)/[class_id]/(links)/components/emptyTest";
import Test from "./test";
import TestsLoading from "./testsLoading";

export default function Tests() {
  const navigate = useRouter();
  const { class_id } = useParams();

  const {
    data: testData,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      let tests: FetchedTestInfo[] = [];
      await axios.get(`/api/tests/class_tests/${class_id}`).then((res) => {
        tests = res.data;
      });

      return tests;
    },
  });

  console.log(testData);

  const renderTests = () => {
    if (isLoading) {
      return <TestsLoading />;
    }

    if (isSuccess && testData.length < 1) {
      return <EmptyTest />;
    }

    if (isSuccess && testData.length > 0) {
      return (
        <Stack>
          {testData.map((test) => {
            return (
              <Test
                refetch={refetch}
                testInfo={test}
                key={test.id}
                variant={ClassVariant.primary}
              />
            );
          })}
        </Stack>
      );
    }
  };

  return (
    <Stack spacing={6}>
      <Stack direction="row" w="100%" justify="space-between" align="center">
        <Text fontSize=".8rem" fontWeight="medium">
          Tests
        </Text>
        <Button
          mt={5}
          w="fit-content"
          fontSize=".7rem"
          p=".5rem .8rem"
          onClick={() => navigate.push("setup_test")}
          leftIcon={<IoMdAdd style={{ fontSize: "1rem" }} />}
        >
          Setup Test
        </Button>
      </Stack>
      {renderTests()}
    </Stack>
  );
}
