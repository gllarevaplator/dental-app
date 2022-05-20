import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { put } from "../../services/apiService";
import "../../buttonStyles/buttonHoverDropShadow.css";

export default function ProfilePictureModal(props) {
  const { patient, onHide } = props;
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUpload = (e) => {
    const image = e.currentTarget.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      setProfilePicture(fileReader.result);
    };
    if (image) {
      fileReader.readAsDataURL(image);
    } else if (!image) {
      setProfilePicture(null);
    }
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    if (profilePicture === null) {
      setErrorMessage("Cannot proceed without a new picture!");
      return;
    } else {
      try {
        patient.profilePicture = profilePicture;
        await put("/Patient/update", patient);
        onHide();
        setProfilePicture(null);
      } catch (ex) {
        console.log(`Errors: ${ex}`);
      }
    }
  };
  const { handleReset } = useFormik({});

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => {
            handleReset();
            setProfilePicture(null);
            setErrorMessage("");
          }}
        >
          <Modal.Title>Change Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center text-center">
          <div>
            <h6>Current Profile Picture</h6>
            <img
              src={patient.profilePicture}
              width="150px"
              height="150px"
              style={{ borderRadius: "50%" }}
            />
          </div>

          <form className="mt-4">
            <label htmlFor="profilePicture" className="form-label">
              Upload New Profile Picture
            </label>
            <input
              id="profilePicture"
              name="profilePicture"
              className="form-control"
              type="file"
              onChange={handleImageUpload}
            />
            <span className="text-danger">{errorMessage}</span>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={() => {
              onHide();
              handleReset();
              setProfilePicture(null);
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
}
