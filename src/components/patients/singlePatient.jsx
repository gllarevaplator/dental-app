import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { get } from "../../services/apiService";
import UpdateModal from "../modals/modalUpdatePatientInfo";
import "./singlePatient.css";
import editIcon from "../../icons/editIcon.svg";
import ProfilePictureModal from "../modals/modalUpdateProfilePicture";
import ProgressCircle from "../materialUIComponents/progressCircle";
import SnackBar from "../materialUIComponents/snackBar";

const Patient = ({ user }) => {
  const [loadingData, setLoadingData] = useState(true);
  const [patient, setPatient] = useState({});
  const [snackBar, setSnackBar] = useState(false);
  const [{ createModal, editModal }, setShow] = useState({
    createModal: false,
    editModal: false,
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const patientId = pathname.substring(9);

  useEffect(() => {
    document.title = "Patient";
    getPatient();
  }, []);

  const getPatient = async () => {
    try {
      const { data: singlePatient } = await get(
        `/Patient/getById?id=${patientId}`
      );
      const patient = singlePatient.data;
      setPatient(patient);
      setLoadingData(false);
    } catch (ex) {
      console.log(`Errors: ${ex}`);
    }
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
      <div className="container my-4">
        <button
          className="btn btn-primary mb-4"
          onClick={() => {
            navigate("/patients");
          }}
        >
          &#8592; Back
        </button>
        <h1 className="mb-4">Patient</h1>
        <div className="row">
          <div className="col-3 mx-3 patient__profile card__box">
            <img src={patient.profilePicture} alt="Patient Profile Pic" />
            {user && (
              <div className="edit-icon">
                <img
                  src={editIcon}
                  className="bi cursor--pointer"
                  onClick={() => setShow({ editModal: true })}
                />
              </div>
            )}
            <ProfilePictureModal
              show={editModal}
              patient={patient}
              onHide={() => setShow({ editModal: false })}
            />
            <h4 className="mt-4">
              {patient.firstname} {patient.lastname}
            </h4>
          </div>

          <div className="col-8 card__box">
            <div className="row">
              <div className="col-4">
                <h6>City</h6>
                <p>{patient.place}</p>
              </div>
              <div className="col-4">
                <h6>Insurance</h6>
                <p>{patient.insurance}</p>
              </div>
              <div className="col-4">
                <h6>Job</h6>
                <p>{patient.job}</p>
              </div>
            </div>
            <hr />
            <div className="row mt-4">
              <div className="col-4">
                <h6>Phone Number</h6>
                <p>{patient.phoneNumberMobile}</p>
              </div>
              <div className="col-4">
                <h6>Email</h6>
                <p>{patient.email}</p>
              </div>
              <div className="col-4">
                <h6>Adittional Information</h6>
                <p>{patient.addition}</p>
              </div>
            </div>
            <hr />
          </div>
        </div>
        {user && (
          <div className="d-flex flex-row-reverse mt-3">
            <button
              className="btn btn-primary"
              onClick={() =>
                setShow({
                  createModal: true,
                })
              }
            >
              Edit Patient Information
            </button>
          </div>
        )}
        <UpdateModal
          show={createModal}
          onShow={(bool) => {
            setSnackBar(bool);
          }}
          onHide={() =>
            setShow({
              createModal: false,
            })
          }
          patient={patient}
        />
        <SnackBar
          open={snackBar}
          message="PATIENT INFORMATION UPDATED SUCCESFULLY!"
          severity="success"
          autoHideDuration={4000}
          handleSnackBarClose={handleSnackBarClose}
        />
      </div>
    </>
  );
};

export default Patient;
