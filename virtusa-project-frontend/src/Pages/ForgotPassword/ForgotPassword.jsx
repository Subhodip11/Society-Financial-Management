import axios from "axios";
import React from "react";

const ForgotPassword = ({ cookie }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    axios
      .post(
        "http://localhost:1221/forgotPassword",
        { email },
        {
          headers: {
            authorization: cookie.get("jwt"),
          },
        },
        { new: true, upsert: true }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter email" id="email" />
      <button type="submit">Send</button>
    </form>
  );
};

export default ForgotPassword;
