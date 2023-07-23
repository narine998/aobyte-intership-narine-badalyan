import React from "react";

import styles from "./SignUp.module.scss";
import { Button } from "@mui/material";

function SignUp(props) {
  return (
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
            <div>
              <div>
                <input type="radio" id="male" name="gender" value="male" />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <input type="radio" id="female" name="gender" value="female" />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            <div className={styles.signUpButtonCont}>
              <Button type="submit">Sign Up</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
