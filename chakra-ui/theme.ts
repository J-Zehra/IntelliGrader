import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import fonts from "./fonts";
import styles from "./global";
import { CustomButton, CustomInput } from "./customComponents";

const theme = extendTheme({
  colors,
  fonts,
  styles,
  components: { Button: CustomButton, Input: CustomInput },
});
export default theme;
