import React from "react";
import { Bar } from "react-chartjs-2";
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

const data = {
  labels: ["Part1", "Part2", "Part3", "Part4", "Part5"],
  datasets: [
    {
      label: "학습 통계",
      data: [80, 50, 30, 70, 85],
      // backgroundColor: "rgba(255, 99, 132, 0.8)",
      backgroundColor: "#FF5151",
      borderRadius: 50,
      borderSkipped: false,
      barThickness: 30,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: true, // X축 그리드 활성화
        drawTicks: true, // 눈금만 표시
        drawOnChartArea: true, // 그래프 내부 선 제거
      },
      ticks: {
        font: {
          size: 16, // ✅ X축 글자 크기 증가
        },
        padding: 16,
      },
    },
    y: {
      grid: {
        display: true, // Y축 내부 눈금 제거
        color: "transparent", // ✅ 일반 Y축 선을 안 보이게 설정
      },

      beginAtZero: true,
      max: 100,
      position: "right", // Y축을 오른쪽에 배치
      ticks: {
        stepSize: 25, // ✅ Y축 눈금을 25 단위로 표시
        font: {
          size: 16, // ✅ Y축 글자 크기 증가
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false, // 범례 숨기기
    },
  },
};

const StudyStatChart = () => {
  return <Bar data={data} options={options} />;
};

export default StudyStatChart;
