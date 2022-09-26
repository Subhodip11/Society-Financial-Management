import "./App.css";
import { useState } from "react";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import SocietyRegister from "./Pages/SocietyRegister/SocietyRegister";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import SocietyUpdate from "./Pages/SocietyUpdate/SocietyUpdate";
import SearchSociety from "./Pages/SearchSociety/SearchSociety";

//initialize cookies for storing tokens
const cookie = new Cookies();

function App() {
  const [initialValuesForUpdateSociety, setInitialValuesForUpdateSociety] =
    useState({
      societyID: "",
      societyName: "",
      city: "",
      pincode: "",
    });

  return (
    <Router>
      <Routes>
        <Route path="/loginAdmin" element={<AdminLogin cookie={cookie} />} />

        <Route
          path="/registerSociety"
          element={<SocietyRegister cookie={cookie} />}
        />

        <Route
          path="/adminDashboard"
          element={
            <AdminDashboard
              cookie={cookie}
              initialValuesForUpdateSociety={initialValuesForUpdateSociety}
              setInitialValuesForUpdateSociety={
                setInitialValuesForUpdateSociety
              }
            />
          }
        />

        <Route
          path="/updateSociety"
          element={
            <SocietyUpdate
              cookie={cookie}
              initialValuesForUpdateSociety={initialValuesForUpdateSociety}
              setInitialValuesForUpdateSociety={
                setInitialValuesForUpdateSociety
              }
            />
          }
        />

        <Route
          path="/searchSociety"
          element={
            <SearchSociety
              cookie={cookie}
              setInitialValuesForUpdateSociety={
                setInitialValuesForUpdateSociety
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
