import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import Input from "../inputForm/input";
import { put } from "../../services/apiService";
import "../../buttonStyles/buttonHoverDropShadow.css";
import * as Yup from "yup";

const UpdateModal = (props) => {
  const { patient, onHide, onShow } = props;
  const [errorMessage, setErrorMessage] = useState("");

  const { handleSubmit, handleChange, handleReset, values, errors, touched } =
    useFormik({
      initialValues: {
        firstname: patient.firstname,
        lastname: patient.lastname,
        email: patient.email,
        place: patient.place,
        job: patient.job,
        phoneNumberMobile: patient.phoneNumberMobile,
        addition: patient.addition,
        insurance: patient.insurance,
      },

      validationSchema: Yup.object().shape({
        firstname: Yup.string()
          .max(15, "Firstname must be less than 15 characters")
          .required("Firstname is required!"),
        lastname: Yup.string()
          .max(15, "Lastname must be less than 15 characters")
          .required("Lastname is required!"),
        email: Yup.string()
          .email("Enter a valid email")
          .required("Email is required!"),
        place: Yup.string()
          .max(25, "Firstname must be less than 25 characters")
          .required("Stickynote is required!"),
        job: Yup.string()
          .max(25, "Job must be less than 25 characters")
          .required("Job is required!"),
        phoneNumberMobile: Yup.number()
          .min(10000000, "Too low")
          .max(100000000, "Too high")
          .required("Reference Number is required!"),
        addition: Yup.string()
          .max(35, "Adittional information must be less than 35 characters")
          .required("Adittional information is required!"),
        insurance: Yup.number()
          .max(100, "Too high")
          .required("Insurance is required!"),
      }),

      onSubmit: async () => {
        if (
          values.firstname === patient.firstname &&
          values.lastname === patient.lastname &&
          values.email === patient.email &&
          values.place === patient.place &&
          values.job === patient.job &&
          values.phoneNumberMobile == patient.phoneNumberMobile &&
          values.addition === patient.addition &&
          values.insurance == patient.insurance
        ) {
          setErrorMessage("Patient information cannot be the same as before!");
          return;
        } else {
          try {
            setErrorMessage("");
            patient.firstname = values.firstname;
            patient.lastname = values.lastname;
            patient.email = values.email;
            patient.place = values.place;
            patient.job = values.job;
            patient.phoneNumberMobile = values.phoneNumberMobile;
            patient.addition = values.addition;
            patient.insurance = values.insurance;
            await put("/Patient/update", patient);
            onHide();
            onShow(true);
          } catch (ex) {
            console.log(`Errors: ${ex}`);
          }
        }
      },
    });

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Update Patient</Modal.Title>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={onHide}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex align-content-start flex-wrap">
            <div className="col-4 p-2">
              <Input
                label="Firstname"
                type="text"
                name="firstname"
                value={values.firstname}
                onChange={(e) => {
                  handleChange(e);
                  setErrorMessage("");
                }}
                touched={touched.firstname}
                errors={errors.firstname}
              />
            </div>
            <div className="col-4 p-2">
              <Input
                label="Lastname"
                type="text"
                name="lastname"
                value={values.lastname}
                onChange={(e) => {
                  handleChange(e);
                  setErrorMessage("");
                }}
                touched={touched.lastname}
                errors={errors.lastname}
              />
            </div>
            <div className="col-4 p-2">
              <Input
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={(e) => {
                  handleChange(e);
                  setErrorMessage("");
                }}
                touched={touched.email}
                errors={errors.email}
              />
            </div>
            <div className="col-4 p-2">
              <Input
                label="City"
                type="text"
                name="place"
                value={values.place}
                onChange={(e) => {
                  handleChange(e);
                  setErrorMessage("");
                }}
                touched={touched.place}
                errors={errors.place}
              />
            </div>
            <div className="col-4 p-2">
              <Input
                label="Job"
                type="text"
                name="job"
                value={values.job}
                onChange={(e) => {
                  handleChange(e);
                  setErrorMessage("");
                }}
                touched={touched.job}
                errors={errors.job}
              />
            </div>
            <div className="col-4 p-2">
              <Input
                label="Mobile Phone Number"
                type="tel"
                name="phoneNumberMobile"
                value={values.phoneNumberMobile}
                onChange={(e) => {
                  handleChange(e);
                  setErrorMessage("");
                }}
                touched={touched.phoneNumberMobile}
                errors={errors.phoneNumberMobile}
              />
            </div>
            <div className="col-4 p-2">
              <Input
                label="Adittional Information"
                type="text"
                name="addition"
                value={values.addition}
                onChange={(e) => {
                  handleChange(e);
                  setErrorMessage("");
                }}
                touched={touched.addition}
                errors={errors.addition}
              />
            </div>
            <div className="col-4 p-2">
              <Input
                label="Insurance"
                type="number"
                name="insurance"
                value={values.insurance}
                onChange={(e) => {
                  handleChange(e);
                  setErrorMessage("");
                }}
                touched={touched.insurance}
                errors={errors.insurance}
              />
            </div>
          </form>
          <div className="text-center">
            <span className="text-danger">{errorMessage}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={() => {
              onHide();
              handleReset();
              setErrorMessage("");
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-success"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateModal;
