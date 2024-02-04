/* eslint-disable import/no-extraneous-dependencies */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { AgChartsReact } from "ag-charts-react";

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

  return (
    <div>
      <AgChartsReact
        options={{
          data: labels.map((label, index) => {
            return {
              number: label,
              correct: tally![index],
            };
          }),
          series: [
            {
              type: "bar",
              direction: "horizontal",
              xKey: "number",
              yKey: "correct",
            },
          ],
        }}
      />
    </div>
  );
}
