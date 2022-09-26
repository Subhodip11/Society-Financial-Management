import React, { useState } from "react";
import styles from "./SearchSociety.module.css";
import axios from "axios";
import SocietyDetailsContainer from "../../Components/SocietyDetialsConatainer/SocietyDetailsContainer";
import Header from "../../Components/Header/Header";
import { Navigate } from "react-router-dom";

const SearchSociety = ({ cookie, setInitialValuesForUpdateSociety }) => {
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
  if (
    cookie.get("isAuthenticated") === "false" ||
    cookie.get("isAuthenticated") === undefined
  ) {
    return <Navigate replace to="/loginAdmin" />;
  } else if (cookie.get("isAuthenticated") === "true") {
    return (
      <div>
        <Header cookie={cookie} />
        <div className={styles.searchSociety}>
          <div className={styles.searchContainer}>
            <div className={styles.inputSearch}>
              <input
                type="text"
                placeholder="Search Society"
                id="searchInputContainer"
              />
              <button type="submit" onClick={handleSearchSociety}>
                Search
              </button>
            </div>
            <div className={styles.filterContainer}>
              <label htmlFor="filter">Select Filter</label>
              <select name="" id="filter">
                <option value="1_1">Search by society ID</option>
                <option value="2_1">Search by society name</option>
                <option value="3_1">Search societies city wise</option>
                <option value="4_1">Search societies pincode wise</option>
              </select>
            </div>
          </div>
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
      </div>
    );
  }
};

export default SearchSociety;
