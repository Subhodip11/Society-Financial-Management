import React from "react";
import styles from "./Header.module.css";
import Logout from "../Logout/Logout";
import { useNavigate } from "react-router-dom";
const Header = ({ cookie }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.headerContainer}>
      <h3 onClick={() => navigate("/adminDashboard")}>
        SOCIETY FINANCIAL MANAGEMENT - ADMIN PORTAL
      </h3>
      <Logout cookie={cookie} />
    </div>
  );
};

export default Header;
