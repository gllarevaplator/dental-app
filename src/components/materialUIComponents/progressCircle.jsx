import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./progressCircle.css";

const ProgressCircle = () => {
  return (
    <Box className="circular--box">
      <CircularProgress />
    </Box>
  );
};

export default ProgressCircle;
