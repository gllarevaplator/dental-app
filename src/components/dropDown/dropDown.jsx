import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DropDown = ({
  label,
  defaultValue,
  menuProperty,
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
            value={("", menu[menuProperty])}
            onClick={() => handleSingleMenuItem(menu)}
          >
            {menu[menuProperty]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;

DropDown.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  menuProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  menuItems: PropTypes.array,
  handleSingleMenuItem: PropTypes.func,
  handleAllMenuItems: PropTypes.func,
};
