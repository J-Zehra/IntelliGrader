import { Center, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { setupTestState } from "@/state/setupTestState";

export default function PointsForAll() {
  const [testInfo, setTestInfo] = useRecoilState(setupTestState);

  const handleChange = (e: string) => {
    const newTestInfo = { ...testInfo };
    newTestInfo.points = parseInt(e, 10);

    setTestInfo(newTestInfo);
  };

  return (
    <Stack bg="palette.light" mt={8} direction="row" borderRadius=".5rem">
      <Center
        flex={1}
        bg="palette.button.secondary"
        p="1rem"
        borderLeftRadius=".5rem"
      >
        <Text
          color="palette.button.primary"
          fontWeight="bold"
          fontSize="1.2rem"
        >
          ~
        </Text>
      </Center>
      <RadioGroup flex={10} onChange={handleChange}>
        <Stack
          direction="row"
          h="100%"
          w="100%"
          paddingInline="1rem"
          align="center"
          justify="space-between"
        >
          {["1", "2", "Custom"].map((choice) => {
            return (
              <Radio
                opacity={0.8}
                value={choice}
                key={choice}
                borderColor="palette.text"
              >
                <Text
                  opacity={0.6}
                  fontWeight="semibold"
                  color="palette.text"
                  fontSize="1rem"
                >
                  {choice}
                </Text>
              </Radio>
            );
          })}
        </Stack>
      </RadioGroup>
    </Stack>
  );
}
