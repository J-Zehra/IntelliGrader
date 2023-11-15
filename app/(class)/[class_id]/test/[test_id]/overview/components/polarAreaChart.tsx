/* eslint-disable import/no-extraneous-dependencies */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useParams } from "next/navigation";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function generateRandomWarmPastelColors(): string[] {
  const randomColors: string[] = [];
  for (let i = 0; i < 40; i += 1) {
    // Generate a warm pastel color by emphasizing red and green with a hint of blue
    const red = Math.floor(Math.random() * 100) + 155; // Ranging from 155 to 255
    const green = Math.floor(Math.random() * 100) + 155; // Ranging from 155 to 255
    const blue = Math.floor(Math.random() * 100) + 100; // Ranging from 100 to 199

    // Adjust the mix of blue and gray by controlling the red and green components
    const mix = Math.random();
    const finalRed = Math.floor(mix * red);
    const finalGreen = Math.floor(mix * green);

    const alpha = Math.random().toFixed(2); // Fixed to 2 decimal places for RGBA
    const rgbaColor = `rgba(${finalRed}, ${finalGreen}, ${blue}, ${alpha})`;
    randomColors.push(rgbaColor);
  }
  return randomColors;
}

export default function PolarAreaChart() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { test_id } = useParams();

  const getStatistics = async () => {
    const data = { testId: test_id };
    let responseData: number[] = [];
    await axios.get("/api/tally", { params: data }).then((res) => {
      const { tally } = res.data;
      responseData = tally;
    });

    return responseData;
  };

  const { data: tally } = useQuery({
    queryKey: ["tally", test_id],
    queryFn: getStatistics,
  });

  const labels: string[] = [];

  if (tally) {
    for (let i = 1; i <= tally.length; i += 1) {
      labels.push(`Q${i}`);
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: "# of Student",
        data: tally,
        backgroundColor: generateRandomWarmPastelColors(),
        borderWidth: 2,
        borderRadius: 20,
      },
    ],
  };

  return (
    <div>
      <PolarArea
        data={data}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
