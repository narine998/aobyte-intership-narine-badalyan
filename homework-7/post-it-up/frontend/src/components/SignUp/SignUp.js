import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { HOME_PATH } from "../../constants";

import logo from "../../assets/logo.png";

import styles from "./SignUp.module.scss";

function SignUp(props) {
  return (
    <>
      <p className={styles.logo}>
        <Link to={HOME_PATH}>
          <img src={logo} alt="logo" />
        </Link>
      </p>
      <div className={styles.signUpContainer}>
        <div>
          <div>
            <h1>Sign Up</h1>
            <p>It's quick and easy.</p>
            <hr />
          </div>
          <div className={styles.formContainer}>
            <form>
              <div className={styles.nameContainer}>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
              </div>
              <div className={styles.emailContainer}>
                <input type="text" placeholder="Mobile number or email" />
              </div>
              <div className={styles.newPasswordContainer}>
                <input type="password" placeholder="New password" />
              </div>
              <div className={styles.signUpButtonCont}>
                <Button type="submit">Sign Up</Button>
              </div>
              <div>
                <span>
                  If you already have an account{" "}
                  <Link to={HOME_PATH}>Login</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
