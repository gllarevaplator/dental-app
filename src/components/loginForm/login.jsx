import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { post } from "../../services/apiService";
import SnackBar from "../materialUIComponents/snackBar";
import Input from "../inputForm/input";

export default function LoginForm() {
  const [snackBar, setSnackBar] = useState(false);

  useEffect(() => {
    document.title = "Login";
  }, []);

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
        window.location = "/home";
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
    <>
      <div className="container mt-4">
        <h1 className="mb-4">Login</h1>
        <form className="col-8">
          <div className="mb-3">
            <Input
              label="Username"
              type="text"
              name="userName"
              placeholder="Username..."
              value={values.userName}
              onChange={handleChange}
              errors={errors.userName}
              touched={touched.userName}
            />
          </div>
          <div className="mb-3">
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Password..."
              value={values.password}
              onChange={handleChange}
              errors={errors.password}
              touched={touched.password}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        <hr />
        <div>
          <p>Username: admin</p>
          <p>Password: admin123</p>
        </div>
        <SnackBar
          open={snackBar}
          message="USERNAME OR PASSWORD IS INCORRECT!"
          severity="error"
          autoHideDuration={4000}
          handleSnackBarClose={handleSnackBarClose}
        />
      </div>
    </>
  );
}
