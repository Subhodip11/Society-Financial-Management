import { React, useEffect, useState } from "react";
import InputContainer from "../../Components/InputContainer/InputContainer";
import { useFormik } from "formik";
import axios from "axios";
import styles from "./AdminLogin.module.css";
import { validateOnChangeHandler } from "../../schemas/adminLogin";
import { useNavigate } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
};

const AdminLogin = ({ cookie }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

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
      axios
        .post("http://localhost:1221/loginAdmin", values)
        .then((response) => {
          const authentic = response.data.isAuthenticated;
          console.log(response.data.data);
          if (authentic) {
            cookie.set("isAuthenticated", authentic, { path: "/" });
            cookie.set("jwt", response.data.token, { path: "/" });
            navigate("/adminDashboard");
          } else setStatus(true);
        })
        .catch((err) => {
          console.log(err);
        });
      handleReset();
    },
  });
  // console.log(errors, touched);
  useEffect(() => {
    setTimeout(() => {
      setStatus(false);
    }, 3000);
  }, [status]);
  return (
    <div className={styles.parentLoginContainer}>
      <div className={styles.loginContainer}>
        {status && (
          <div className={styles.errorMessage}>Incorrect Credentials</div>
        )}
        <div className={styles.header}>
          <span>Login</span>
        </div>
        <form className={styles.fields} onSubmit={handleSubmit}>
          <InputContainer
            type="text"
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
            type={"text"}
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
