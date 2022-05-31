import React, { useEffect, useState } from "react";
import { get } from "../../services/apiService";
import PatientsTable from "./patientsTable";
import CreateModal from "../modals/modalCreatePatient";
import Input from "../inputForm/input";
import ProgressCircle from "../materialUIComponents/progressCircle";
import SnackBar from "../materialUIComponents/snackBar";
import "../../buttonStyles/buttonHoverDropShadow.css";

const Patients = ({ user }) => {
  const [loadingData, setLoadingData] = useState(true);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    document.title = "Patients";
    getPatients();
    return () => {
      // Clear the patients state after components unmounts
      setPatients([]);
    };
  }, []);

  const getPatients = async () => {
    try {
      const { data: users } = await get(
        "/Patient/getAllForPagination?PageNumber=1&PageSize=10"
      );
      const patients = users.data.items;
      setPatients(patients);
      setLoadingData(false);
    } catch (ex) {
      console.log(`Errors: ${ex}`);
    }
  };

  const handleDelete = (patient) => {
    const deletePatient = patients.filter((allPatients) => {
      return allPatients.id !== patient.id;
    });
    setPatients(deletePatient);
    setDeleted(true);
    setSnackBar(true);
  };

  const handleSearch = (e) => {
    const search = e.currentTarget.value;
    setSearchQuery(search);
  };

  const handleSnackBarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  if (loadingData) {
    return ProgressCircle();
  }

  return (
    <>
      <div className="container mt-4">
        <h1 className="mb-4">Patients</h1>
        {user && (
          <button
            className="btn btn-success mb-3"
            onClick={() => setShow(true)}
          >
            Add Patient
          </button>
        )}
        <CreateModal
          show={show}
          onHide={() => setShow(false)}
          patients={patients}
          setLoadingData={(bool) => setLoadingData(bool)}
          setPatients={(newPatient) => setPatients(newPatient)}
          onShow={(bool) => {
            setSnackBar(bool);
            setDeleted(false);
          }}
        />
        <div className="d-flex align-items-center mb-3">
          <div className="flex-grow-1">
            <Input
              type="text"
              placeholder="Search by firstname or lastname..."
              onChange={handleSearch}
            />
          </div>
          <div>
            <button className="btn btn-primary mt-4">Search</button>
          </div>
        </div>

        <PatientsTable
          patients={patients}
          handleDelete={handleDelete}
          user={user}
          searchQuery={searchQuery}
        />
        {!user && (
          <div className="text-center">
            <p>
              <strong>Login to create edit or delete a patient</strong>
            </p>
          </div>
        )}
        <SnackBar
          open={snackBar}
          message={deleted ? "PATIENT DELETED" : "PATIENT CREATED SUCCESFULLY"}
          severity={deleted ? "error" : "success"}
          autoHideDuration={4000}
          handleSnackBarClose={handleSnackBarClose}
        />
      </div>
    </>
  );
};

export default Patients;
