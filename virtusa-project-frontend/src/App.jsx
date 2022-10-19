import "./App.css";
import { useState } from "react";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import SocietyRegister from "./Pages/SocietyRegister/SocietyRegister";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import SocietyUpdate from "./Pages/SocietyUpdate/SocietyUpdate";
import SearchSociety from "./Pages/SearchSociety/SearchSociety";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import OTPVerification from "./Pages/OTPVerification/OTPVerification";

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
          element={
            <ProtectedRoute cookie={cookie}>
              <SocietyRegister cookie={cookie} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute cookie={cookie}>
              <AdminDashboard
                cookie={cookie}
                initialValuesForUpdateSociety={initialValuesForUpdateSociety}
                setInitialValuesForUpdateSociety={
                  setInitialValuesForUpdateSociety
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/updateSociety"
          element={
            <ProtectedRoute cookie={cookie}>
              <SocietyUpdate
                cookie={cookie}
                initialValuesForUpdateSociety={initialValuesForUpdateSociety}
                setInitialValuesForUpdateSociety={
                  setInitialValuesForUpdateSociety
                }
              />
            </ProtectedRoute>
          }
        />

        <Route path="/otpVerification" element={<OTPVerification />} />

        <Route
          path="/searchSociety"
          element={
            <ProtectedRoute cookie={cookie}>
              <SearchSociety
                cookie={cookie}
                setInitialValuesForUpdateSociety={
                  setInitialValuesForUpdateSociety
                }
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
