import { Center, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import PointsForAll from "./pointsForAll";

export default function Step3() {
  const [active, setActive] = useState<number>(0);

  return (
    <Stack>
      <Stack direction="row" spacing={0}>
        <Center
          bg={active === 0 ? "palette.button.secondary" : "palette.light"}
          textAlign="center"
          p="1rem"
          borderLeftRadius=".5rem"
          flex={1}
          w="100%"
          onClick={() => setActive(0)}
          cursor="pointer"
        >
          <Text color="palette.button.primary" fontWeight="medium">
            Set Points For All
          </Text>
        </Center>
        <Center
          w="100%"
          p=".5rem"
          bg={active === 1 ? "palette.button.secondary" : "palette.light"}
          borderRightRadius=".5rem"
          flex={1}
          cursor="pointer"
          onClick={() => setActive(1)}
        >
          <Text
            textAlign="center"
            color="palette.button.primary"
            fontWeight="medium"
          >
            Set Custom Points
          </Text>
        </Center>
      </Stack>
      <PointsForAll />
    </Stack>
  );
}
