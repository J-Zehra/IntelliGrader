import { Button, Stack, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import EmptyTest from "./emptyTest";

export default function Tests() {
  const empty = true;

  const renderButton = () => {
    if (!empty) {
      <Button
        mt={5}
        w="fit-content"
        fontSize=".7rem"
        p=".5rem .8rem"
        leftIcon={<IoMdAdd style={{ fontSize: "1rem" }} />}
      >
        Setup Test
      </Button>;
    } else return null;
  };

  return (
    <Stack spacing={6}>
      <Stack direction="row" w="100%" justify="space-between" align="center">
        <Text fontSize=".8rem" fontWeight="medium">
          Tests
        </Text>
        {renderButton()}
      </Stack>
      <EmptyTest />
    </Stack>
  );
}
