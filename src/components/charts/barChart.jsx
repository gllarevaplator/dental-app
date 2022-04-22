import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

export default function BarChart({ chartData }) {
  return <Bar data={chartData} />;
}
