import React from "react";
import InputContainer from "../../Components/InputContainer/InputContainer";
import { useFormik } from "formik";
import styles from "./AdminLogin.module.css";
import { validateOnChangeHandler } from "../../schemas/adminLogin";

const initialValues = {
  username: "",
  password: "",
};

const AdminLogin = () => {
  const {
    errors,
    touched,
    values,
    handleChange,
    handleblur,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validateOnChangeHandler,
    onSubmit: (values) => {
      // console.log(values);
      handleReset();
    },
  });
  console.log(errors, touched);

  return (
    <div className={styles.parentLoginContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.header}>
          <span>Login</span>
        </div>
        <form className={styles.fields} onSubmit={handleSubmit}>
          <InputContainer
            name={"username"}
            labelName={"Username"}
            inputContainerName={"Enter username"}
            fieldName={values.username}
            handleChange={handleChange}
            handleblur={handleblur}
          />
          <div style={{ height: "1.5rem" }}>
            {errors.username && touched.username ? (
              <div className={styles.errorContainer}>{errors.username}</div>
            ) : null}
          </div>
          <InputContainer
            name={"password"}
            labelName={"Password"}
            inputContainerName={"Enter password"}
            fieldName={values.password}
            handleChange={handleChange}
            handleblur={handleblur}
          />
          <div style={{ height: "1.5rem" }}>
            {errors.password && touched.password ? (
              <div className={styles.errorContainer}>{errors.password}</div>
            ) : null}
          </div>
          <button className={styles.loginBtn} type="submit">
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
