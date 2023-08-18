import { Button, Stack, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
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
        </Stack>
        <Stack mt={5} spacing={3}>
          {[...Array(3)].map((item) => {
            return <Class key={item} />;
          })}
        </Stack>
      </Stack>
    </CustomContainer>
  );
}
