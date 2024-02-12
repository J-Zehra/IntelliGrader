/* eslint-disable import/no-extraneous-dependencies */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PolarAreaChart() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { test_id, class_id } = useParams();

  const getStatistics = async () => {
    const data = { testId: test_id, classId: class_id };
    let responseData: Partial<{
      studentPassed: number;
      studentFailed: number;
      ungradedStudents: number;
    }> = {};
    await axios.get("/api/student_mark", { params: data }).then((res) => {
      responseData = res.data;
    });

    return responseData;
  };

  const { data: markData } = useQuery({
    queryKey: ["student-mark", test_id],
    queryFn: getStatistics,
  });

  const data = {
    labels: ["Passed", "Failed", "Ungraded"],
    datasets: [
      {
        data: [
          markData?.studentPassed,
          markData?.studentFailed,
          markData?.ungradedStudents,
        ],
        backgroundColor: [
          "rgba(0, 0, 255, 0.2)",
          "rgba(255, 0, 0, 0.2)",
          "rgba(200, 200, 200, 0.2)",
        ],
        borderColor: [
          "rgba(0, 0, 255, 0.8)",
          "rgba(255, 0, 0, 0.8)",
          "rgba(200, 200, 200, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
}
