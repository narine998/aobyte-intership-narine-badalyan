import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import DropDown from "../DropDown/DropDown";

import { HOME_PATH, SIGNUP_PATH } from "../../constants";

import favicon from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";

import styles from "./Header.module.scss";

function Header({
  inputRef,
  handleInputChange,
  handleSearchTypeChange,
  handleLoginClick,
  searchType,
  onePost,
}) {
  return (
    <header className={styles.header}>
      <Link to={HOME_PATH} className={styles.favicon}>
        <img src={favicon} alt="favicon" />
      </Link>
      <div className={styles.searchContainer}>
        <div className={styles.searchDiv}>
          <input
            ref={inputRef}
            type="text"
            placeholder={`Search by ${searchType}...`}
            onDragOver={(e) => e.preventDefault()}
            onChange={handleInputChange}
          />
          <img className={styles.search} src={searchIcon} alt="search" />
        </div>
        {!onePost && (
          <DropDown
            onChange={handleSearchTypeChange}
            option1="title"
            option2="comment"
            role="Search by"
          />
        )}
      </div>
      <div className={styles.authContainer}>
        <Button onClick={handleLoginClick} variant="contained" size="large">
          Sign In
        </Button>
        <Link to={SIGNUP_PATH}>
          <Button variant="contained" size="large" className={styles.signupBtn}>
            Sign Up
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
