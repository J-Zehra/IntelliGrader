/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Center, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Navigation } from "swiper/modules";
import { useParams } from "next/navigation";
import axios from "axios";
import { Grade } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export default function RecentScans() {
  const { class_id } = useParams();

  const getStudentGrades = async () => {
    const id = class_id;
    let studentGrade: Grade[] = [];
    await axios.get(`/api/recent_scans/${id}`).then((res) => {
      studentGrade = res.data;
    });

    return studentGrade;
  };

  const { data: studentGrades, isLoading } = useQuery({
    queryFn: getStudentGrades,
    queryKey: ["get-recent-scans", class_id],
  });

  console.log(studentGrades);

  return (
    <Skeleton isLoaded={!isLoading} borderRadius="1rem">
      <Stack w="100%">
        <Swiper
          style={{ width: "100%", padding: "1rem" }}
          effect="coverflow"
          grabCursor
          slidesPerView={1}
          coverflowEffect={{
            rotate: -100,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          navigation
          modules={[EffectCoverflow, Navigation]}
        >
          {studentGrades && studentGrades?.length > 0 ? (
            studentGrades?.map((student) => {
              return (
                <SwiperSlide>
                  <Center
                    flexDir="column"
                    borderRadius="1rem"
                    w="100%"
                    h="15rem"
                    bg="palette.background"
                    boxShadow="2px 5px 15px rgba(0, 0, 100, .1)"
                  >
                    <Box flex={2} w="100%" h="70%">
                      <Image
                        borderTopRadius="1rem"
                        alt="Processed Image"
                        src={`data:image/jpeg;base64, ${student.processedImage}`}
                        w="100%"
                        h="100%"
                        opacity={0.5}
                        objectFit="cover"
                      />
                    </Box>
                    <Stack
                      p="1rem"
                      w="100%"
                      direction="row"
                      align="center"
                      justify="space-between"
                      flex={1}
                    >
                      <Text>{moment(student.createdAt).calendar()}</Text>
                      <Text
                        color={
                          student.status === "Passed" ? "green" : "red.500"
                        }
                      >
                        {student.status}
                      </Text>
                    </Stack>
                  </Center>
                </SwiperSlide>
              );
            })
          ) : (
            <Center>
              <Text fontWeight="semibold" opacity={0.6}>
                No recent scans
              </Text>
            </Center>
          )}
        </Swiper>
      </Stack>
    </Skeleton>
  );
}
