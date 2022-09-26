import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logout from "../../Components/Logout/Logout";
import SocietyDetailsContainer from "../../Components/SocietyDetialsConatainer/SocietyDetailsContainer";

const AdminDashboard = ({
  cookie,
  initialValuesForUpdateSociety,
  setInitialValuesForUpdateSociety,
}) => {
  const navigate = useNavigate();
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
        else {
          cookie.remove("isAuthenticated");
          cookie.remove("jwt");
          navigate("/loginAdmin");
        }
        // console.log(response.data);
      })
      .catch((err) => {
        cookie.remove("isAuthenticated");
        cookie.remove("jwt");
        console.log(err.message);
      });
  }, []);

  // console.log(typeof cookie.get("isAuthenticated"));
  if (
    cookie.get("isAuthenticated") === "false" ||
    cookie.get("isAuthenticated") === undefined
  ) {
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
              <Logout cookie={cookie} />
            </div>
          </div>
        </header>
        <main>
          {societyData &&
            societyData.map((ele, index) => {
              return (
                <SocietyDetailsContainer
                  index={index}
                  ele={ele}
                  setInitialValuesForUpdateSociety={
                    setInitialValuesForUpdateSociety
                  }
                />
              );
            })}
        </main>
      </div>
    );
  }
};

export default AdminDashboard;
