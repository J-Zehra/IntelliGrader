/* eslint-disable import/no-extraneous-dependencies */
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function generateRandomNumbers(): number[] {
  const randomNumbers: number[] = [];
  for (let i = 0; i < 40; i += 1) {
    randomNumbers.push(Math.floor(Math.random() * 41)); // Generates a random number between 0 and 40
  }
  return randomNumbers;
}

function generateRandomColors(): string[] {
  const randomColors: string[] = [];
  for (let i = 0; i < 40; i += 1) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const alpha = Math.random().toFixed(2); // Fixed to 2 decimal places for RGBA

    // Adjust the mix of blue and gray by controlling the red and green components
    const mix = Math.random();
    const finalRed = Math.floor(mix * red);
    const finalGreen = Math.floor(mix * green);

    const rgbaColor = `rgba(${finalRed}, ${finalGreen}, ${blue}, ${alpha})`;
    randomColors.push(rgbaColor);
  }
  return randomColors;
}

export default function PolarAreaChart() {
  const labels: string[] = [];

  for (let i = 1; i <= 40; i += 1) {
    labels.push(`Q${i}`);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "# of Student",
        data: generateRandomNumbers(),
        backgroundColor: generateRandomColors(),
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
