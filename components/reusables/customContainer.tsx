import { Box } from "@chakra-ui/react";
import breakPoints from "@/utils/breakpoints";

export default function CustomContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box w={breakPoints} maxW="container.xl" h="100%" margin="auto">
      {children}
    </Box>
  );
}
