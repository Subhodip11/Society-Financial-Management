import { React, useEffect, useState } from "react";
import styles from "./SocietyRegister.module.css";
import InputContainer from "../../Components/InputContainer/InputContainer";
import { useFormik } from "formik";
import { validateOnChange } from "../../schemas/societyRegister";
import axios from "axios";

const initialValues = {
  societyName: "",
  city: "",
  pincode: "",
};

const SocietyRegister = () => {
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
        .post("http://localhost:1221/registerSociety", values)
        .then((response) => {
          console.log(response);
          setStatus(true);
        })
        .catch((err) => {
          console.log(err);
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

  return (
    <div className={styles.parentLoginContainer}>
      <div className={styles.loginContainer}>
        {status || checkRegistration ? (
          <div className={styles.status}>
            {status ? "Successfully Registered" : null}
            {checkRegistration ? "Unable to Register (Network Error)" : null}
          </div>
        ) : null}
        <div className={styles.header}>
          <span>Regsiter Society</span>
        </div>
        <form className={styles.fields} onSubmit={handleSubmit}>
          <InputContainer
            name={"societyName"}
            labelName={"Society Name"}
            inputContainerName={"Enter name"}
            fieldName={values.societyName}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <div style={{ height: "1.5rem" }}>
            {errors.societyName && touched.societyName ? (
              <div className={styles.errorContainer}>{errors.societyName}</div>
            ) : null}
          </div>
          <InputContainer
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
};

export default SocietyRegister;
