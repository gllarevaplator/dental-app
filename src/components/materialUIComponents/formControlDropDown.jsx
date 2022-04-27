import React from "react";
import { PatientChartData } from "../../models/patientChartData";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const FormControlDropDown = ({ sumTreatments, setPatientChartData }) => {
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
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="demo-simple-select-autowidth-label">
        Select a Year
      </InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        defaultValue=""
      >
        <MenuItem onClick={handleAllYearsMenuItem} value={"All Years"} selected>
          <em>All Years</em>
        </MenuItem>
        {PatientChartData.map((patient) => (
          <MenuItem
            key={patient.id}
            value={("", patient.year)}
            onClick={() => handleMenuItem(patient)}
          >
            {patient.year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormControlDropDown;
