import React, { useState } from "react";
import styles from "./EmailVerification.module.css";
import axios from "axios";
export const EmailVerification = () => {
  const [email, setEmail] = useState("");

  const sendEmailHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1221/emailVerification", { email: email })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <form onSubmit={sendEmailHandler}>
        <div className={styles.emailName}>
          <input
            type="text"
            placeholder="Enter the email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};
