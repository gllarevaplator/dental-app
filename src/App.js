import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NavBar from "./components/navigationBar/navbar";
import Home from "./components/dashboard/home";
import Patients from "./components/patients/allPatients";
import LoginForm from "./components/loginForm/login";
import Treatments from "./components/treatments/treatments";
import Patient from "./components/patients/singlePatient";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const jwtToken = localStorage.getItem("token");
      const user = jwtDecode(jwtToken);
      setUser(user);
    } catch (ex) {}
  }, []);

  return (
    <>
      <NavBar user={user} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/patients" element={<Patients user={user} />} />
        <Route path="/contact" element={<Treatments />} />
        <Route path="/patient/:id" element={<Patient user={user} />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
