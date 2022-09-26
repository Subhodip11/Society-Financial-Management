import { React, useEffect, useState } from "react";
import styles from "./SocietyRegister.module.css";
import InputContainer from "../../Components/InputContainer/InputContainer";
import { useFormik } from "formik";
import { validateOnChange } from "../../schemas/societyRegister";
import axios from "axios";
import Message from "../../Components/MessageContainer/Message";
import { Navigate, useNavigate } from "react-router-dom";
import Logout from "../../Components/Logout/Logout";

const initialValues = {
  societyName: "",
  city: "",
  pincode: "",
};

const SocietyRegister = ({ cookie }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [checkRegistration, setCheckRegistration] = useState(false);
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    handleReset,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validateOnChange,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("http://localhost:1221/registerSociety", values, {
          headers: {
            authorization: cookie.get("jwt"),
          },
        })
        .then((response) => {
          console.log(response);
          const authentic = response.data.isAuthenticated;
          if (authentic) {
            cookie.set("isAuthenticated", authentic, {
              path: "/",
            });
            setStatus(true);
          } else {
            cookie.remove("isAuthenticated");
            cookie.remove("jwt");
            navigate("/loginAdmin");
          }
        })
        .catch((err) => {
          console.log(err);
          cookie.remove("isAuthenticated");
          cookie.remove("jwt");
          checkRegistration(true);
        });
      handleReset();
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setStatus(false);
      setCheckRegistration(false);
    }, 5000);
  }, [status]);

  if (
    cookie.get("isAuthenticated") === "false" ||
    cookie.get("isAuthenticated") === undefined
  ) {
    return <Navigate replace to="/loginAdmin" />;
  } else if (cookie.get("isAuthenticated") === "true") {
    return (
      <div className={styles.parentLoginContainer}>
        <div className={styles.loginContainer}>
          <Message status={status} checkRegistration={checkRegistration} />
          <div className={styles.header}>
            <Logout cookie={cookie} />
            <span>Regsiter Society</span>
          </div>
          <form className={styles.fields} onSubmit={handleSubmit}>
            <InputContainer
              type={"text"}
              name={"societyName"}
              labelName={"Society Name"}
              inputContainerName={"Enter name"}
              fieldName={values.societyName}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <div style={{ height: "1.5rem" }}>
              {errors.societyName && touched.societyName ? (
                <div className={styles.errorContainer}>
                  {errors.societyName}
                </div>
              ) : null}
            </div>
            <InputContainer
              type={"text"}
              name={"city"}
              labelName={"City"}
              inputContainerName={"Enter city"}
              fieldName={values.city}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <div style={{ height: "1.5rem" }}>
              {errors.city && touched.city ? (
                <div className={styles.errorContainer}>{errors.city}</div>
              ) : null}
            </div>
            <InputContainer
              type={"text"}
              name={"pincode"}
              labelName={"Pincode"}
              inputContainerName={"Enter pincode"}
              fieldName={values.pincode}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <div style={{ height: "1.5rem" }}>
              {errors.pincode && touched.pincode ? (
                <div className={styles.errorContainer}>{errors.pincode}</div>
              ) : null}
            </div>
            <button className={styles.loginBtn} type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default SocietyRegister;
