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
    <tr className={styles.rowDetails}>
      <td>{ele.societyID}</td>
      <td>{ele.societyName}</td>
      <td>{ele.city}</td>
      <td>{ele.pincode}</td>
      <td>
        <button
          className={styles.updateBtn}
          onClick={(e) => {
            handleUpdate(e, ele);
          }}
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default SocietyDetailsContainer;
