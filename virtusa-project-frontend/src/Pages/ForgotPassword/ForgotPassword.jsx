import React from "react";
import styles from "./ForgotPassword.module.css";
import { useFormik } from "formik";

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
  } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
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

          {touched && errors.newPassword ? (
            <div>{errors.newPassword}</div>
          ) : null}
        </div>
        <div className={styles.confirmPassword}>
          <input
            type="text"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {touched && errors.confirmPassword ? (
            <div>{errors.confirmPassword}</div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
