/* eslint-disable @typescript-eslint/naming-convention */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useParams } from "next/navigation";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export default function AreaChart() {
  const { class_id } = useParams();

  const getPassingRates = async () => {
    let grade: Partial<{ testName: string; passingRate: number }[]> = [];
    await axios
      .get(`/api/class_passing_rate_distribution/${class_id}`)
      .then((res) => {
        grade = res.data;
      });

    return grade;
  };

  const { data: passingRates } = useQuery({
    queryKey: ["passing-rate-distribution", class_id],
    queryFn: getPassingRates,
  });

  const data = {
    labels: passingRates?.map((item) => item?.testName),
    datasets: [
      {
        label: "Passing Rate",
        data: passingRates?.map((item) => item?.passingRate),
        backgroundColor: "rgba(0, 0, 200, 0.2)",
        borderColor: "rgba(0, 0, 200, .5)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Radar data={data} options={{ plugins: { legend: { align: "start" } } }} />
  );
}
