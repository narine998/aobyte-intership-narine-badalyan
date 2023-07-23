import React, { useState } from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import hiddenEye from "../../assets/hidden.png";
import openEye from "../../assets/eye.png";

import styles from "./Login.module.scss";

const BackDrop = ({ onClick }) => {
  return <div className={styles.backDrop} onClick={onClick}></div>;
};

const LoginModal = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.loginContent}>
        <h1>Log Into Post It Up</h1>
        <form>
          <div className={styles.inputContainer}>
            <TextField
              id="outlined-basic"
              label="Email or phone"
              variant="outlined"
            />
          </div>
          <div className={styles.inputContainer}>
            <TextField
              id="outlined-password-input"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
            />
            <img
              onClick={showPasswordHandler}
              className={styles.eye}
              src={showPassword ? openEye : hiddenEye}
              alt="eye"
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              onClick={() => {
                onClose();
              }}
              type="submit"
            >
              Log In
            </Button>
          </div>
          <div className={styles.signup}>
            <span>
              Don't have an account? <strong>Sign Up</strong>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

function Login({ handleLoginModalClose }) {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={handleLoginModalClose} />,
        document.getElementById("backdrop-container")
      )}
      {ReactDOM.createPortal(
        <LoginModal onClose={handleLoginModalClose} />,
        document.getElementById("modal-container")
      )}
    </>
  );
}

export default Login;
