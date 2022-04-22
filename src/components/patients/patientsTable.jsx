import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./patientsTable.css";
import viewIcon from "../../icons/viewIcon.svg";
import deleteIcon from "../../icons/deleteIcon.svg";
import "../../icons/iconHover.css";

const PatientsTable = (props) => {
  const { patients, handleDelete, user } = props;

  return (
    <table className="table patient--table">
      <thead>
        <tr>
          <th>Profile Pic</th>
          <th>Full Name</th>
          <th>City</th>
          <th>Email</th>
          <th>Job</th>
          <th>Phone Number</th>
          <th colSpan="3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {patients.length === 0 ? (
          <tr className="empty__table">
            <td colSpan="8">No Patient Available :(</td>
          </tr>
        ) : null}
        {patients.map((patient) => (
          <tr key={patient.id}>
            <td className="profile__picture">
              <img src={patient.profilePicture} alt="Patient Profile Pic" />
            </td>
            <td>
              {patient.firstname} {patient.lastname}
            </td>
            <td>{patient.place}</td>
            <td>{patient.email}</td>
            <td>{patient.job}</td>
            <td>{patient.phoneNumberMobile}</td>
            <td className="viewIcon">
              <Link
                data="View Patient"
                to={{
                  pathname: `/patient/${patient.id}`,
                }}
              >
                <img src={viewIcon} className="bi" />
              </Link>
            </td>
            {user && (
              <td className="deleteIcon">
                <a data="Delete Patient">
                  <img
                    src={deleteIcon}
                    className="bi cursor--pointer"
                    onClick={() => handleDelete(patient)}
                  />
                </a>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientsTable;
