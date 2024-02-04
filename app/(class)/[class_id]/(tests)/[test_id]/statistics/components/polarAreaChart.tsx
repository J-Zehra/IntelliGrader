/* eslint-disable import/no-extraneous-dependencies */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { AgChartsReact } from "ag-charts-react";

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

  const numFormatter = new Intl.NumberFormat("en-US");

  const data = [
    { mark: "Passed", number: markData?.studentPassed },
    { mark: "Failed", number: markData?.studentFailed },
    { mark: "Ungraded", number: markData?.ungradedStudents },
  ];

  return (
    <div>
      <AgChartsReact
        options={{
          padding: { top: 0, bottom: 0, left: 0, right: 0 },
          background: { fill: "transparent" },
          series: [
            {
              data,
              type: "pie",
              calloutLabelKey: "mark",
              sectorLabelKey: "number",
              angleKey: "number",
              calloutLabel: {
                offset: 10,
              },
              sectorLabel: {
                formatter: ({ datum, sectorLabelKey = "number" }) => {
                  return `${numFormatter.format(
                    datum[sectorLabelKey],
                  )} students`;
                },
              },
              tooltip: {
                renderer: ({ datum, angleKey, calloutLabelKey = "mark" }) => ({
                  title: `${datum[calloutLabelKey]}`,
                  content: `${datum[angleKey]} students`,
                }),
              },
            },
          ],
        }}
      />
    </div>
  );
}
