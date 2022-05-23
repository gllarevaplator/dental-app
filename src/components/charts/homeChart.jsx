import React, { useState } from "react";
import { PatientChartData } from "../../models/patientChartData";
import BarChart from "./barChart";
import FormControls from "./formControl";
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

  const handleAllYearsMenuItem = () => {
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

  const handleMenuItem = (patient) => {
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
      <FormControls
        inputLabel="Select a Year"
        data={PatientChartData}
        handleMenuItem={handleMenuItem}
        handleAllYearsMenuItem={handleAllYearsMenuItem}
      />
      <BarChart chartData={patientChartData} />
    </>
  );
};

export default HomeChart;
