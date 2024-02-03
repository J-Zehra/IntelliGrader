import { Box, Input, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { ClassVariant } from "@/utils/types";
import { classInfoState } from "@/state/classInfoState";

export default function Step1() {
  const [classInfo, setClassInfo] = useRecoilState(classInfoState);

  const bgVariant = (variant: ClassVariant) => {
    let background = "";

    switch (variant) {
      case ClassVariant.primary:
        background = "linear-gradient(to left, #003C8F, #006CFB)";
        break;
      case ClassVariant.secondary:
        background = "transparent";
        break;
      default:
        background = "#E2E8EF";
    }

    return background;
  };

  return (
    <Stack spacing=".5rem" pt="1.5rem" w={{ base: "100%", sm: "30rem" }}>
      <Box paddingBottom="1rem">
        <RadioGroup
          onChange={(e) => {
            setClassInfo((prev) => ({
              ...prev,
              program: "",
              schoolLevel: e,
            }));
          }}
          value={classInfo.schoolLevel}
        >
          <Stack direction="row" spacing="1.2rem">
            <Radio value="College">College</Radio>
            <Radio value="High School">High School</Radio>
            <Radio value="Elementary">Elementary</Radio>
          </Stack>
        </RadioGroup>
      </Box>
      {classInfo.schoolLevel === "College" ? (
        <Input
          placeholder="Program (acronym)"
          type="text"
          bg="gray.100"
          h="3rem"
          fontSize=".9rem"
          value={classInfo.program}
          onChange={(e) =>
            setClassInfo((prev) => ({
              ...prev,
              program: e.target.value.toUpperCase(),
            }))
          }
        />
      ) : null}
      <Input
        placeholder={classInfo.schoolLevel === "College" ? "Course" : "Subject"}
        type="text"
        bg="gray.100"
        h="3rem"
        fontSize=".9rem"
        value={classInfo.course}
        onChange={(e) =>
          setClassInfo((prev) => ({ ...prev, course: e.target.value }))
        }
      />
      <Input
        placeholder="Section"
        type="text"
        bg="gray.100"
        h="3rem"
        fontSize=".9rem"
        value={classInfo.section}
        onChange={(e) =>
          setClassInfo((prev) => ({ ...prev, section: e.target.value }))
        }
      />
      <Input
        placeholder="Year level"
        type="number"
        maxLength={1}
        bg="gray.100"
        h="3rem"
        fontSize=".9rem"
        value={!classInfo.year ? "" : classInfo.year}
        onChange={(e) =>
          setClassInfo((prev) => ({
            ...prev,
            year: parseInt(e.target.value, 10),
          }))
        }
      />
      <Stack direction="row" spacing={2} align="center" h="4rem">
        <Text fontSize=".8rem" opacity={0.8} paddingRight="1rem">
          Choose Design Variant
        </Text>
        {[
          ClassVariant.secondary,
          ClassVariant.default,
          ClassVariant.primary,
        ].map((item) => {
          return (
            <Box
              w={classInfo.variant === item ? "2.5rem" : "2rem"}
              borderRadius=".2rem"
              h={classInfo.variant === item ? "2.5rem" : "2rem"}
              border={
                classInfo.variant === item
                  ? "1px solid rgba(0, 80, 255, .5)"
                  : "1px solid rgba(0, 0, 0, .2)"
              }
              opacity={classInfo.variant === item ? 1 : 0.9}
              transition="all .1s ease"
              onClick={() =>
                setClassInfo((prev) => ({ ...prev, variant: item }))
              }
              bg={bgVariant(item)}
              key={item}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}
