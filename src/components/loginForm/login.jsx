import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { post } from "../../services/apiService";
import SnackBar from "../materialUIComponents/snackBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const LoginForm = () => {
  const theme = createTheme();
  const [snackBar, setSnackBar] = useState(false);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string()
        .required("Username is required")
        .min(3, "Username must be longer than 2 characters")
        .max(15, "Username must be less than 15 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(3, "Password must be longer than 2 characters")
        .max(15, "Password must be less than 15 characters"),
    }),

    onSubmit: async (values) => {
      try {
        const { data } = await post("/Account/Login", {
          userName: values.userName,
          password: values.password,
        });
        localStorage.setItem("token", data.token);
        window.location = "/";
      } catch (ex) {
        setSnackBar(true);
      }
    },
  });

  const handleSnackBarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Username"
                    label="Username"
                    name="userName"
                    value={values.userName}
                    onChange={handleChange}
                  />
                  {touched.userName && errors.userName ? (
                    <span className="text-danger">{errors.userName}</span>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Password"
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {touched.password && errors.password ? (
                    <span className="text-danger">{errors.password}</span>
                  ) : null}
                </Grid>
              </Grid>
              <Button
                type="submit"
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, p: 1.6 }}
              >
                Log In
              </Button>
            </Box>
          </Box>
          <Grid container>
            <Grid item xs className="text-center">
              <span>Username: admin</span>
              <br />
              <span>Password: admin123</span>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
      <SnackBar
        open={snackBar}
        message="USERNAME OR PASSWORD IS INCORRECT!"
        handleSnackBarClose={handleSnackBarClose}
        severity="error"
        autoHideDuration={4000}
      />
    </div>
  );
};

export default LoginForm;

// Style without material UI
// import React, { useEffect, useState, useRef } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { post } from "../../services/apiService";
// import SnackBar from "../materialUIComponents/snackBar";
// import Input from "../inputForm/input";
// import "./login.css";

// const LoginForm = () => {
//   const [snackBar, setSnackBar] = useState(false);

//   useEffect(() => {
//     document.title = "Login";
//   }, []);

//   const { values, errors, touched, handleChange, handleSubmit } = useFormik({
//     initialValues: {
//       userName: "",
//       password: "",
//     },
//     validationSchema: Yup.object().shape({
//       userName: Yup.string()
//         .required("Username is required")
//         .min(3, "Username must be longer than 2 characters")
//         .max(15, "Username must be less than 15 characters"),
//       password: Yup.string()
//         .required("Password is required")
//         .min(3, "Password must be longer than 2 characters")
//         .max(15, "Password must be less than 15 characters"),
//     }),

//     onSubmit: async (values) => {
//       try {
//         const { data } = await post("/Account/Login", {
//           userName: values.userName,
//           password: values.password,
//         });
//         localStorage.setItem("token", data.token);
//         window.location = "/home";
//       } catch (ex) {
//         setSnackBar(true);
//       }
//     },
//   });

//   const handleSnackBarClose = (reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackBar(false);
//   };

//   return (
//     <>
//       <div className="container login-container mt-4">
//         <h1 className="mb-4">Login</h1>
//         <form className="col-6">
//           <div className="mb-3">
//             <Input
//               label="Username"
//               type="text"
//               name="userName"
//               placeholder="Username..."
//               value={values.userName}
//               onChange={handleChange}
//               errors={errors.userName}
//               touched={touched.userName}
//             />
//           </div>
//           <div className="mb-3">
//             <Input
//               label="Password"
//               type="password"
//               name="password"
//               placeholder="Password..."
//               value={values.password}
//               onChange={handleChange}
//               errors={errors.password}
//               touched={touched.password}
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn btn-primary"
//             onClick={handleSubmit}
//           >
//             Login
//           </button>
//         </form>
//         <hr />
//         <div>
//           <p>Username: admin</p>
//           <p>Password: admin123</p>
//         </div>
//         <SnackBar
//           open={snackBar}
//           message="USERNAME OR PASSWORD IS INCORRECT!"
//           severity="error"
//           autoHideDuration={4000}
//           handleSnackBarClose={handleSnackBarClose}
//         />
//       </div>
//     </>
//   );
// };
// export default LoginForm;
