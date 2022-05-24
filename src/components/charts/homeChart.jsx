import React, { useState } from "react";
import { PatientChartData } from "../../models/patientChartData";
import BarChart from "./barChart";
import DropDown from "../dropDown/dropDown";
import _ from "lodash";

const HomeChart = () => {
  const allTreatments = PatientChartData.map((patient) => patient.treatments);
  const sumTreatments = _.sum(allTreatments);

  const [patientChartData, setPatientChartData] = useState({
    labels: PatientChartData.map((patient) => patient.year),
    datasets: [
      {
        label: `${sumTreatments} Treatments for ${PatientChartData.length} years`,
        data: PatientChartData.map((patient) => patient.treatments),
        backgroundColor: PatientChartData.map((patient) => patient.color),
      },
    ],
  });

  const handleAllMenuItems = () => {
    setPatientChartData({
      labels: PatientChartData.map((patient) => patient.year),
      datasets: [
        {
          label: `${sumTreatments} Treatments for ${PatientChartData.length} years`,
          data: PatientChartData.map((patient) => patient.treatments),
          backgroundColor: PatientChartData.map((patient) => patient.color),
        },
      ],
    });
  };

  const handleSingleMenuItem = (patient) => {
    setPatientChartData({
      labels: [patient.year],
      datasets: [
        {
          label: `${patient.treatments} Treatments on year ${patient.year}`,
          data: [patient.treatments],
          backgroundColor: [patient.color],
        },
      ],
    });
  };

  return (
    <>
      <DropDown
        label="Select a Year"
        defaultValue="All years"
        menuItems={PatientChartData}
        handleSingleMenuItem={handleSingleMenuItem}
        handleAllMenuItems={handleAllMenuItems}
      />
      <BarChart chartData={patientChartData} />
    </>
  );
};

export default HomeChart;
