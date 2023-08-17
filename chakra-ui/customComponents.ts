import { defineStyleConfig } from "@chakra-ui/react";

export const CustomInput = defineStyleConfig({
  variants: {
    primary: {
      field: {
        bg: "palette.background",
        boxShadow: "0 1px 10px rgba(0, 0, 0, .1)",
        fontSize: "1.2rem",
        p: "1.8rem 1.4rem",
        _placeholder: { color: "rgba(0, 0, 100, .5)" },
      },
      _focus: { outlineColor: "red", borderColor: "red" },
    },
  },
});

export const CustomButton = defineStyleConfig({
  baseStyle: { textTransform: "uppercase" },
  variants: {
    solid: {
      bg: "palette.accent",
      boxShadow: "0 5px 10px rgba(0, 0, 0, .2)",
      color: "palette.background",
      p: "1.8rem",
      fontSize: "1.2rem",
      fontWeight: "bold",
      _hover: { bg: "palette.button.background_hover" },
    },
  },
});
