import { Stack, Link } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import { ClassVariant, FetchedClassInfo } from "@/utils/types";
import { headerState } from "@/state/headerState";
import { container, item as animationItem } from "@/utils/animations";
import Class from "./class";

export default function ClassesList({
  classesData,
}: {
  classesData: FetchedClassInfo[];
}) {
  const setHeader = useSetRecoilState(headerState);

  return (
    <Stack
      spacing={3}
      as={motion.div}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {classesData.map((classData) => (
        <Link
          key={classData.id}
          href={`/${classData.id}`}
          as={motion.a}
          variants={animationItem}
          onClick={() => setHeader(classData.subject)}
        >
          <Class variant={ClassVariant.primary} classInfo={classData} />
        </Link>
      ))}
    </Stack>
  );
}
