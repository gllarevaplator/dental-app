import React, { useState } from "react";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackBar = ({
  open,
  message,
  severity,
  autoHideDuration,
  handleSnackBarClose,
}) => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackBarClose}
        autoHideDuration={autoHideDuration}
      >
        <Alert className="mt-5" severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBar;

SnackBar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  severity: PropTypes.string,
  autoHideDuration: PropTypes.number,
  handleSnackBarClose: PropTypes.func,
};
