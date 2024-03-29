import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Input from "../inputForm/input";
import { Patient } from "../../models/patientModel";
import { post } from "../../services/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../buttonStyles/buttonHoverDropShadow.css";

const CreateModal = ({
  patients,
  setPatients,
  onShow,
  onHide,
  setLoadingData,
  ...props
}) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureError, setProfilePictureError] = useState("");

  useEffect(() => {
    return () => {
      // Clear the modal state after submitting data and component unmounting
      setProfilePicture(null);
      setProfilePictureError("");
    };
  }, []);

  const handleImageUpload = (e) => {
    const image = e.currentTarget.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      setProfilePicture(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  };

  const { handleSubmit, handleChange, handleReset, values, errors, touched } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        place: "",
        job: "",
        phoneNumberMobile: "",
        addition: "",
        insurance: "",
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
        Patient.firstname = values.firstname;
        Patient.lastname = values.lastname;
        Patient.email = values.email;
        Patient.place = values.place;
        Patient.job = values.job;
        Patient.phoneNumberMobile = values.phoneNumberMobile;
        Patient.addition = values.addition;
        Patient.insurance = values.insurance;
        Patient.profilePicture = profilePicture;
        setLoadingData(true);
        try {
          const { data: patient } = await post("/Patient/create", Patient);
          setPatients([patient.data, ...patients]);
          onHide();
          onShow(true);
          handleReset();
          setLoadingData(false);
          setProfilePictureError("");
        } catch (ex) {
          console.log(ex);
          setProfilePictureError(
            "Image is too large, try uploading a new one!"
          );
        }
      },
    });
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>Add New Patient</Modal.Title>
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              touched={touched.insurance}
              errors={errors.insurance}
            />
          </div>
          <div className="col-4 p-2">
            <Input
              label="Profile Picture"
              type="file"
              name="profilePicture"
              onChange={handleImageUpload}
            />
            <span className="text-danger">{profilePictureError}</span>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-danger"
          onClick={() => {
            onHide();
            handleReset();
            setProfilePictureError("");
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-success"
          type="submit"
          onClick={handleSubmit}
        >
          Add Customer
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateModal;

CreateModal.propTypes = {
  patients: PropTypes.array,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
};
