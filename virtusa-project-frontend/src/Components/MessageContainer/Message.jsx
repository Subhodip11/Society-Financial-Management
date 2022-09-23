import React from "react";
import styles from "./Message.module.css";

const Message = (props) => {
  return (
    <div>
      {props.status || props.checkRegistration ? (
        <div className={styles.status}>
          {props.status ? "Successfully Registered" : null}
          {props.checkRegistration
            ? "Unable to Register (Network Error)"
            : null}
        </div>
      ) : null}
    </div>
  );
};

export default Message;
