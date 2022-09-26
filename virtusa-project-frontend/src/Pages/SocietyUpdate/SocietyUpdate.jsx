import React, { useEffect, useState } from "react";
import styles from "./SocietyUpdate.module.css";
import InputContainer from "../../Components/InputContainer/InputContainer";
import { useFormik } from "formik";
import { validateOnChange } from "../../schemas/societyRegister";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Logout from "../../Components/Logout/Logout";
import Header from "../../Components/Header/Header";

const SocietyUpdate = ({
  cookie,
  initialValuesForUpdateSociety,
  setInitialValuesForUpdateSociety,
}) => {
  const navigate = useNavigate();
  const initialValues = {
    societyName: initialValuesForUpdateSociety.societyName,
    city: initialValuesForUpdateSociety.city,
    pincode: initialValuesForUpdateSociety.pincode,
  };
  const [status, setStatus] = useState("");
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleReset,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validateOnChange,
    onSubmit: (values) => {
      console.log(values);

      axios
        .post(
          "http://localhost:1221/updateSociety",
          { societyID: initialValuesForUpdateSociety.societyID, ...values },
          {
            headers: {
              authorization: cookie.get("jwt"),
            },
          }
        )
        .then((response) => {
          console.log("response", response.data);
          cookie.set("isAuthenticated", response.data.isAuthenticated, {
            path: "/",
          });
          setStatus(response.data.data);
        })
        .catch((err) => {
          console.log("Error occured in update Society", err.message);
          cookie.remove("jwt");
          cookie.remove("isAuthenticated");
        });
      handleReset();
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (status === "Successfully updated...") navigate("/adminDashboard");
      setStatus("");
    }, 2000);
  }, [status]);

  if (
    cookie.get("isAuthenticated") === "false" ||
    cookie.get("isAuthenticated") === undefined
  ) {
    return <Navigate replace to="/loginAdmin" />;
  } else if (cookie.get("isAuthenticated") === "true") {
    return (
      <div className={styles.parentLoginContainer}>
        <Header cookie={cookie} />
        <div className={styles.Wrapper}>
          <div className={styles.loginContainer}>
            {status !== "" ? (
              <div
                className={styles.errorMessage}
                style={{
                  backgroundColor:
                    status === "Successfully Updated..."
                      ? "rgba(241, 56, 56, 0.7)"
                      : "rgba(71, 190, 71, 0.6)",
                }}
              >
                {status}
              </div>
            ) : null}
            <div className={styles.header}>
              <span>Update Society Details</span>
            </div>
            <form className={styles.fields} onSubmit={handleSubmit}>
              <InputContainer
                type={"text"}
                name={"societyName"}
                labelName={"Update Society Name"}
                inputContainerName={"Enter updated name"}
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
                labelName={"Update City"}
                inputContainerName={"Enter updated city name"}
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
                labelName={"Update Pincode"}
                inputContainerName={"Enter updated pincode"}
                fieldName={values.pincode}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <div style={{ height: "1.5rem" }}>
                {errors.pincode && touched.pincode ? (
                  <div className={styles.errorContainer}>{errors.pincode}</div>
                ) : null}
              </div>
              <button className={styles.updateBtn} type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default SocietyUpdate;
