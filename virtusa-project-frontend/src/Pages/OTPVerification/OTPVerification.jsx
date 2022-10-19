import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./OTPVerification.module.css";

const OTPVerification = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(0);
  const [responseOTP, setResponseOTP] = useState("");
  const [responseMssg, setResponseMssg] = useState("");

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
    } else {
      setResponseMssg((mssg) => (mssg = "Invalid OTP"));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setResponseMssg((mssg) => (mssg = ""));
    }, 3000);
  }, [responseMssg]);

  return (
    <div>
      <div className={styles.submissionResults}>{responseMssg}</div>
      <form onSubmit={handleGetOtp}>
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

      <form onSubmit={handleVerifyOtp}>
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
  );
};

export default OTPVerification;
