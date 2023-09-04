import { Button, Stack, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { ClassVariant } from "@/utils/types";
import CustomContainer from "./reusables/customContainer";
import Class from "./class";

export default function ClassesList() {
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
          {[
            ClassVariant.primary,
            ClassVariant.secondary,
            ClassVariant.tertiary,
            ClassVariant.default,
          ].map((item) => {
            return (
              <Link key={item} href="/class1">
                <Class variant={item} />
              </Link>
            );
          })}
        </Stack>
      </Stack>
    </CustomContainer>
  );
}
