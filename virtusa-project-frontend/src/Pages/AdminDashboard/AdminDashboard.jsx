import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
  if (
    cookie.get("isAuthenticated") === "false" ||
    cookie.get("isAuthenticated") === undefined
  ) {
    return <Navigate replace to="/loginAdmin" />;
  } else if (cookie.get("isAuthenticated") === "true") {
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
        </main>
      </div>
    );
  }
};

export default AdminDashboard;
