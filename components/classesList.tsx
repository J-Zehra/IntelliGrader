import { Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ClassVariant, FetchedClassInfo } from "@/utils/types";
import { container } from "@/utils/animations";
import Class from "./class";

export default function ClassesList({
  classesData,
}: {
  classesData: FetchedClassInfo[];
}) {
  return (
    <Stack
      spacing={2}
      as={motion.div}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {classesData.map((classData) => (
        <Class
          key={classData.id}
          variant={ClassVariant.primary}
          classInfo={classData}
        />
      ))}
    </Stack>
  );
}
