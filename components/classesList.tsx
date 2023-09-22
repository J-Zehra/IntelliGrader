import { Button, Stack, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { ClassVariant, FetchedClassInfo } from "@/utils/types";
import { headerState } from "@/state/headerState";
import CustomContainer from "./reusables/customContainer";
import Class from "./class";

export default function ClassesList() {
  const setHeader = useSetRecoilState(headerState);

  const getClasses = async () => {
    let classes: FetchedClassInfo[] = [];
    await axios.get("/api/classes").then((res) => {
      classes = res.data;
    });

    return classes;
  };

  const { data } = useQuery({ queryKey: ["classes"], queryFn: getClasses });

  return (
    <CustomContainer>
      <Stack pt="7rem">
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
        <Stack mt={5} spacing={3}>
          {data?.map((item) => {
            return (
              <Link
                key={item.id}
                href={`/${item.id}`}
                onClick={() => setHeader(item.subject)}
              >
                <Class variant={ClassVariant.primary} classInfo={item} />
              </Link>
            );
          })}
        </Stack>
      </Stack>
    </CustomContainer>
  );
}
