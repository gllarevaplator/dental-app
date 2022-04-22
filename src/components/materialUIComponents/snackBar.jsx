import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SnackBar(props) {
  const { open, message, severity, autoHideDuration, handleSnackBarClose } =
    props;

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
}
