import React from "react";
import styles from "./ForgotPassword.module.css";
import { useFormik } from "formik";
import validateOnChange from "../../schemas/forgotPassword";
import axios from "axios";
import { Navigate } from "react-router-dom";

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

const ForgotPassword = ({ forgotPassword }) => {
  const {
    values,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
    handleReset,
    touched,
  } = useFormik({
    validationSchema: validateOnChange,
    initialValues,
    onSubmit: (values) => {
      axios
        .post(
          "http://localhost:1221/forgotPassword",
          { newPassword: values.newPassword },
          {}
        )
        .then((response) => {
          console.log(response.data.data);
        })
        .catch((err) => {
          console.log(
            "Error while updating password at backend side",
            err.message
          );
        });

      handleReset();
    },
  });
  if (!forgotPassword) {
    return <Navigate to="/otpVerification" />;
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.newPassword}>
            <input
              type="text"
              placeholder="Enter New Password"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.newPassword && errors.newPassword ? (
              <div>{errors.newPassword}</div>
            ) : null}
          </div>
          <div className={styles.confirmPassword}>
            <input
              type="text"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.confirmPassword && errors.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}
          </div>

          <button type="submit" onClick={(e) => e.preventDefault()}>
            Change Password
          </button>
        </form>
      </div>
    );
  }
};

export default ForgotPassword;
