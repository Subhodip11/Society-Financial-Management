import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import axios from "axios";

const AdminDashboard = () => {
  const [societyData, setSocietyData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1221/societies")
      .then((response) => {
        setSocietyData((societyData) => (societyData = response.data.data));
        console.log(response.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <h3>SOCIETY FINANCIAL MANAGEMENT - ADMIN PORTAL</h3>
        <div className={styles.searchSociety}>
          <input type="text" placeholder="Search Society" />
          <button type="submit">Search</button>
          <select name="" id="filter">
            <option value="0">Filter</option>
            <option value="1">Search By Society ID</option>
            <option value="2">Search By Society Name</option>
          </select>
        </div>
        <div className={styles.navbar}>
          <div className={styles.addSociety}>Add Society</div>
        </div>
      </header>
      <main>
        {societyData &&
          societyData.map((ele, index) => {
            return (
              <section key={index} className={styles.societyDetailsContainer}>
                <div className={styles.detailsContainer}>
                  <div className={styles.societyName}>
                    Society Name :- {ele.societyName}
                  </div>
                  <div className={styles.city}>City :- {ele.city}</div>
                  <div className={styles.pincode}>Pincode :- {ele.pincode}</div>
                </div>
                <div className={styles.updateSocietyBtn}>
                  <button className={styles.updateBtn}>Update Society</button>
                </div>
              </section>
            );
          })}
      </main>
    </div>
  );
};

export default AdminDashboard;
