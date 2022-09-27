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
        <div className={styles.tags}>
          <div className={styles.innerLabel}>SocietyID &#8594;</div>
          <span className={styles.innerText}>{ele.societyID}</span>
        </div>
        <div className={styles.tags}>
          <div className={styles.innerLabel}>Society Name &#8594;</div>
          <span className={styles.innerText}>{ele.societyName}</span>
        </div>
        <div className={styles.tags}>
          <div className={styles.innerLabel}>City &#8594;</div>
          <span className={styles.innerText}>{ele.city}</span>
        </div>
        <div className={styles.tags}>
          <div className={styles.innerLabel}>Pincode &#8594;</div>
          <span className={styles.innerText}>{ele.pincode}</span>
        </div>
      </div>
      <div className={styles.updateBtnContainer}>
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
