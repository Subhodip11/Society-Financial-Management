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
  const [searchedDoc, setSearchedDoc] = useState([]);

  const handleSearchSociety = async (e) => {
    let getOption = document.getElementById("filter").value;
    let searchVal = document.getElementById("searchInputContainer").value;
    console.log(getOption);
    axios
      .post(
        "http://localhost:1221/searchSociety",
        { option: getOption, searchVal: searchVal },
        {
          headers: {
            authorization: cookie.get("jwt"),
          },
        }
      )
      .then((response) => {
        setSearchedDoc(response.data.data);
        cookie.set("isAuthenticated", response.data.isAuthenticated);
        console.log(response.data.data);
      })
      .catch((err) => {
        cookie.remove("jwt");
        cookie.remove("isAuthenticated");
      });
  };

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
            <input
              type="text"
              placeholder="Search Society"
              id="searchInputContainer"
            />
            <button type="submit" onClick={handleSearchSociety}>
              Search
            </button>
            <select name="" id="filter">
              <option value="1_1">Search by society ID</option>
              <option value="2_1">Search by society name</option>
              <option value="3_1">Search societies city wise</option>
              <option value="4_1">Search societies pincode wise</option>
            </select>
            {searchedDoc !== "No results found!" && searchedDoc ? (
              searchedDoc.map((ele, index) => {
                return (
                  <SocietyDetailsContainer
                    key={index}
                    ele={ele}
                    setInitialValuesForUpdateSociety={
                      setInitialValuesForUpdateSociety
                    }
                  />
                );
              })
            ) : (
              <h3>No results found</h3>
            )}
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
