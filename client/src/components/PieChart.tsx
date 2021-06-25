import React, { useRef } from "react";
import { useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export const PieChart: React.FC<{
  labels: string[];
  label: string;
  data: number[];
  backgroundColor: string[];
}> = ({ backgroundColor, data, labels, label }) => {
  let chartRef = useRef<any>(null);

  console.log(
    "back",
    backgroundColor,
    "data",
    data,
    "labels",
    labels,
    "label",
    label
  );

  useEffect(() => {
    let pieChart = new Chart(chartRef.current, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor,
            hoverOffset: 4,
            borderWidth: 1,
          },
        ],
      },
    });

    return () => {
      pieChart.destroy();
    };
  }, []);

  return (
    <div className="chart__container">
      <canvas width="400" height="400" ref={chartRef}></canvas>
    </div>
  );
};
