import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./OTPVerification.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";

const OTPVerification = ({ setForgotPassword }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(0);
  const [responseOTP, setResponseOTP] = useState("");
  const [responseMssg, setResponseMssg] = useState("");
  const navigate = useNavigate();

  const handleGetOtp = (e) => {
    e.preventDefault();
    let testMobileNumber = /^[+]91[789]\d{9}$/;
    console.log(testMobileNumber.test(mobileNumber));
    if (testMobileNumber.test(mobileNumber)) {
      axios
        .post(
          "http://localhost:1221/otpVerification",
          { mobileNumber },

          { new: true, upsert: true }
        )
        .then((response) => {
          console.log(response.data);
          setResponseMssg((mssg) => (mssg = response.data.data));
          setResponseOTP((responseOTP) => (responseOTP = response.data.otp));
        })
        .catch((err) => console.log(err));
    } else {
      setResponseMssg((mssg) => (mssg = "Invalid Mobile Number"));
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    console.log(responseOTP, otp);
    if (responseOTP.toString() === otp.toString()) {
      setResponseMssg((mssg) => (mssg = "OTP verified Successfully"));
      setForgotPassword(true);
      navigate("/forgotPassword");
    } else {
      setForgotPassword(false);
      setResponseMssg((mssg) => (mssg = "Invalid OTP"));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setResponseMssg((mssg) => (mssg = ""));
    }, 3000);
  }, [responseMssg]);

  return (
    <div className={styles.parentContainer}>
      <div className={styles.submissionResults}>{responseMssg}</div>
      <div className={styles.verificationContainer}>
        <form className={styles.mobileForm} onSubmit={handleGetOtp}>
          <div className={styles.mobileNumber}>
            <label htmlFor="email">Mobile Number</label>
            <input
              type="tel"
              placeholder="Enter mobile number"
              id="email"
              value={mobileNumber}
              onChange={(e) => setMobileNumber((num) => (num = e.target.value))}
            />
            <button type="submit">Get OTP</button>
          </div>
        </form>

        <form className={styles.otpVerifyForm} onSubmit={handleVerifyOtp}>
          <div className={styles.otp}>
            <label htmlFor="otp">OTP</label>
            <input
              type="number"
              placeholder="Enter OTP"
              id="otp"
              value={otp}
              onChange={(e) => setOtp((otp) => (otp = e.target.value))}
            />
            <button type="submit">Verify OTP</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
