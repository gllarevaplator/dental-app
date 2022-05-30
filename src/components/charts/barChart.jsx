import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const BarChart = ({ chartData }) => {
  return <Bar data={chartData} />;
};

export default BarChart;

BarChart.propTypes = {
  chartData: PropTypes.object,
};
