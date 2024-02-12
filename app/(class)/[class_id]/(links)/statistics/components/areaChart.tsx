/* eslint-disable @typescript-eslint/naming-convention */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useParams } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
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
    <Bar
      data={data}
      options={{
        indexAxis: "y" as const,
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: { align: "start" },
          title: {
            display: true,
            text: "Passing Rate Distrubution",
          },
        },
      }}
    />
  );
}
