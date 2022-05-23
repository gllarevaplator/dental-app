import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const FormControls = ({
  label,
  data,
  value,
  handleMenuItem,
  handleAllYearsMenuItem,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        defaultValue=""
      >
        <MenuItem onClick={handleAllYearsMenuItem} value={value} selected>
          <em>{value}</em>
        </MenuItem>
        {data.map((d) => (
          <MenuItem
            key={d.id}
            value={("", d.year)}
            onClick={() => handleMenuItem(d)}
          >
            {d.year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormControls;
