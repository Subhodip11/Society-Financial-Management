import "./App.css";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import SocietyRegister from "./Pages/SocietyRegister/SocietyRegister";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "universal-cookie";

const cookie = new Cookies();

function App() {
  //set cookies for storing tokens

  // console.log(isAuthenticated);
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
          element={<AdminDashboard cookie={cookie} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
