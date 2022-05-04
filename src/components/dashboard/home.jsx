import React, { useState, useEffect } from "react";
import { PatientChartData } from "../../models/patientChartData";
import BarChart from "../charts/barChart";
import FormControlDropDown from "../charts/dropDownChartYears";
import _ from "lodash";

const Home = () => {
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

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>
      <div className="mt-4">
        <FormControlDropDown
          sumTreatments={sumTreatments}
          setPatientChartData={setPatientChartData}
        />
      </div>
      <BarChart chartData={patientChartData} />
    </div>
  );
};

export default Home;
