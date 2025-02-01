import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Plugin,
} from "chart.js";

// Chart.js의 필요한 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  score: number;
}

// 🟢 커스텀 플러그인: 도넛 차트 중앙에 점수 표시
const centerTextPlugin: Plugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { width, height, ctx } = chart;
    ctx.save();

    const text = chart.options.plugins?.centerText?.text || "";
    ctx.font = "bold 3rem Arial"; // 글씨 크기와 폰트
    ctx.fillStyle = "black"; // 글자 색상
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2); // 중앙에 텍스트 출력
    ctx.restore();
  },
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({ score }) => {
  // 점수 범위별 색상
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#67B7D1"; // 파란색
    if (score >= 60) return "#F5A623"; // 주황색
    return "#D0021B"; // 빨간색
  };

  const data = {
    labels: ["점수", "남은 부분"],
    datasets: [
      {
        data: [score, 100 - score], // 실제 점수 + 남은 부분
        backgroundColor: [getScoreColor(score), "#EAEAEA"], // 점수 색상 + 회색 배경
        borderWidth: 0, // 경계선 없애기
      },
    ],
  };

  const options = {
    cutout: "70%", // 도넛 모양 (중앙 비우기). %가 높을수록 두꺼워짐
    animation: {
      duration: 1600,
    },
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      centerText: {
        text: score.toString(), // 중앙 텍스트: 점수
      },
    },
  };

  return (
    <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
  );
};

export default DoughnutChart;
