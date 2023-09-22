import { Box, Button, Link, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { IoMdAdd } from "react-icons/io";

export default function EmptyTest() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { class_id } = useParams();
  return (
    <Stack align="center">
      <Image
        src="/empty_class.svg"
        alt="empty-class"
        width={500}
        height={500}
        style={{ width: "5rem" }}
      />
      <Text
        fontSize="1rem"
        opacity=".6"
        fontWeight="semibold"
        color="palette.button.primary"
      >
        No tests yet.
      </Text>
      <Text
        fontWeight="normal"
        opacity=".6"
        fontSize=".8rem"
        color="palette.button.primary"
      >
        So spacious here. Why not create one?
      </Text>
      <Box mt={5}>
        <Link href={`${class_id}/test/setup_test`}>
          <Button
            w="fit-content"
            fontSize=".8rem"
            p="1rem"
            leftIcon={<IoMdAdd style={{ fontSize: "1rem" }} />}
          >
            Setup Test
          </Button>
        </Link>
      </Box>
    </Stack>
  );
}
