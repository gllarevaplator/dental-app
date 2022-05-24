import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DropDown = ({
  label,
  defaultValue,
  menuItems,
  handleSingleMenuItem,
  handleAllMenuItems,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        defaultValue=""
      >
        <MenuItem onClick={handleAllMenuItems} value={defaultValue} selected>
          <em>{defaultValue}</em>
        </MenuItem>
        {menuItems.map((menu) => (
          <MenuItem
            key={menu.id}
            value={("", menu.year)}
            onClick={() => handleSingleMenuItem(menu)}
          >
            {menu.year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
