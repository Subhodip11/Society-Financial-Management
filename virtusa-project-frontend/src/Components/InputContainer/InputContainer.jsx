import React from "react";
import styles from "./InputContainer.module.css";
const InputContainer = (props) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor="password">{props.labelName}</label>
      <input
        type="text"
        id={styles["password"]}
        name={props.name}
        placeholder={props.inputContainerName}
        value={props.fieldName}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
      />
    </div>
  );
};

export default InputContainer;
