import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface StudyStatChartProps {
  scores: number[];
}

const StudyStatChart: React.FC<StudyStatChartProps> = ({ scores }) => {
  const data = {
    labels: ["Part1", "Part2", "Part3", "Part4", "Part5"],
    datasets: [
      {
        label: "학습 통계",
        data: scores,
        backgroundColor: "#FF5151",
        borderRadius: 50,
        borderSkipped: false,
        barThickness: 22.5,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: true,
          drawTicks: true,
          drawOnChartArea: true,
        },
        ticks: {
          font: {
            size: 16,
          },
          padding: 16,
        },
      },
      y: {
        type: "linear",
        position: "right",
        beginAtZero: true,
        max: 100,
        grid: {
          display: true,
          color: "transparent",
        },
        ticks: {
          stepSize: 25,
          font: {
            size: 16,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} width={350} height={200} />;
};

export default StudyStatChart;
