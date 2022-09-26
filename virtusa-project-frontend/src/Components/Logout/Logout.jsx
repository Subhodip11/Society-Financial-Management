import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";

const Logout = ({ cookie }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Entered here");
    cookie.remove("jwt");
    cookie.remove("isAuthenticated");
    navigate("/loginAdmin");
  };
  return (
    <div className={styles.logoutContainer}>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
