import React from "react";
import PropTypes from "prop-types";

export default function Input({
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
  errors,
  touched,
}) {
  return (
    <>
      <div>
        <label htmlFor={label} className="form-label">
          {label}
        </label>
        <input
          className="form-control"
          type={type}
          name={name}
          placeholder={placeholder}
          id={label}
          value={value}
          onChange={onChange}
        />
        {errors && touched ? (
          <span className="text-danger">{errors}</span>
        ) : null}
      </div>
    </>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  errors: PropTypes.string,
  touched: PropTypes.bool,
};
