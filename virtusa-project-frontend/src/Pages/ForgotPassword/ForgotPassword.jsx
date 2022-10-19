import React from "react";
import styles from "./ForgotPassword.module.css";
import { useFormik } from "formik";
import validateOnChange from "../../schemas/forgotPassword";
import axios from "axios";

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

const ForgotPassword = () => {
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

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
