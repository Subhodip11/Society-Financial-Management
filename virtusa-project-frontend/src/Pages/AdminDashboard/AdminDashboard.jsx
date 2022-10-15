import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SocietyDetailsContainer from "../../Components/SocietyDetialsConatainer/SocietyDetailsContainer";
import Header from "../../Components/Header/Header";

const AdminDashboard = ({
  cookie,
  initialValuesForUpdateSociety,
  setInitialValuesForUpdateSociety,
}) => {
  const navigate = useNavigate();
  const [societyData, setSocietyData] = useState([]);

  useEffect(() => {
    if (
      cookie.get("isAuthenticated") !== undefined ||
      cookie.get("isAuthenticated") !== "false"
    )
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

  return (
    <div>
      <Header cookie={cookie} />
      <header className={styles.header}>
        <div className={styles.navbar}>
          <div className={styles.addSociety}>
            <Link to="/registerSociety" className={styles.btn}>
              Add Society
            </Link>
            <Link to="/searchSociety" className={styles.btn}>
              Search Society
            </Link>
          </div>
        </div>
      </header>
      <main>
        <table className={styles.detailsTable}>
          <thead>
            <tr>
              <th>Society ID</th>
              <th>Society Name</th>
              <th>City</th>
              <th>Pincode</th>
              <th>Update Details</th>
            </tr>
          </thead>
          <tbody>
            {societyData &&
              societyData.map((ele, index) => {
                return (
                  <SocietyDetailsContainer
                    key={index}
                    ele={ele}
                    setInitialValuesForUpdateSociety={
                      setInitialValuesForUpdateSociety
                    }
                  />
                );
              })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminDashboard;
