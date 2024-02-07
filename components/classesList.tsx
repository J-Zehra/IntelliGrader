import { Wrap } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FetchedClassInfo } from "@/utils/types";
import { container } from "@/utils/animations";
import Class from "./class";

export default function ClassesList({
  classesData,
}: {
  classesData: FetchedClassInfo[];
}) {
  return (
    <Wrap
      spacing={2}
      as={motion.div}
      variants={container}
      initial="hidden"
      animate="show"
      w="100%"
    >
      {classesData.map((classData) => (
        <Class variant={classData.variant} classInfo={classData} />
      ))}
    </Wrap>
  );
}
