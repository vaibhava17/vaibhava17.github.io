import React from "react";
import styles from "./button.module.css";

function AppButton({ className, onClick, label, ...rest }) {
  return (
    <button
      className={`${className} ${styles.btn} text-light bg-tansparent border-0 d-flex align-items-center `}
      onClick={onClick}
      {...rest}
    >
      {label}
      <div className={`${styles.arrow} ms-3`} />
    </button>
  );
}

export default AppButton;
