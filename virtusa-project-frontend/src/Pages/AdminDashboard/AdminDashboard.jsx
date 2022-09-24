import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const AdminDashboard = ({ cookie }) => {
  const [societyData, setSocietyData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1221/societies", {
        headers: {
          authorization: cookie.get("jwt"),
        },
      })
      .then((response) => {
        setSocietyData(response.data.data);
        const authentic = response.data.isAuthenticated;
        if (authentic)
          cookie.set("isAuthenticated", authentic, {
            path: "/",
          });
        else cookie.remove("isAuthenticated");
        // console.log(response.data);
      })
      .catch((err) => {
        cookie.remove("isAuthenticated");
        cookie.remove("jwt");
        console.log(err.message);
      });
  }, []);

  // console.log(typeof cookie.get("isAuthenticated"));
  if (cookie.get("isAuthenticated") === "false") {
    return <Navigate replace to="/loginAdmin" />;
  } else if (cookie.get("isAuthenticated") === "true") {
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
            <div className={styles.addSociety}>
              <Link to="/registerSociety">Add Society</Link>
            </div>
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
                    <div className={styles.pincode}>
                      Pincode :- {ele.pincode}
                    </div>
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
  }
};

export default AdminDashboard;
