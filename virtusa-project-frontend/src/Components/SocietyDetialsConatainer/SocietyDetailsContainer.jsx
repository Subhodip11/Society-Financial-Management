import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SocietyDetailsContainer.module.css";

const SocietyDetailsContainer = ({ ele, setInitialValuesForUpdateSociety }) => {
  const navigate = useNavigate();

  const handleUpdate = (e, societyData) => {
    setInitialValuesForUpdateSociety(societyData);
    navigate("/updateSociety");
  };
  return (
    <section className={styles.societyDetailsContainer}>
      <div className={styles.detailsContainer}>
        <div className={styles.societyID}>SocietyID :- {ele.societyID}</div>
        <div className={styles.societyName}>
          Society Name :- {ele.societyName}
        </div>
        <div className={styles.city}>City :- {ele.city}</div>
        <div className={styles.pincode}>Pincode :- {ele.pincode}</div>
      </div>
      <div className={styles.updateSocietyBtn}>
        <button
          className={styles.updateBtn}
          onClick={(e) => {
            handleUpdate(e, ele);
          }}
        >
          Update Society
        </button>
      </div>
    </section>
  );
};

export default SocietyDetailsContainer;
