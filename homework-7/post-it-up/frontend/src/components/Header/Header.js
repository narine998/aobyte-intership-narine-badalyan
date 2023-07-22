import React from "react";

import favicon from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";

import styles from "./Header.module.scss";
import DropDown from "../DropDown/DropDown";

function Header(props) {
  const { inputRef, handleInputChange, handleSearchTypeChange, searchType } =
    props;

  return (
    <header className={styles.header}>
      <a className={styles.favicon}>
        <img src={favicon} alt="favicon" />
      </a>
      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder={`Search by ${searchType}...`}
          onDragOver={(e) => e.preventDefault()}
          onChange={handleInputChange}
        />
        <img className={styles.search} src={searchIcon} alt="search" />
        <DropDown
          onChange={handleSearchTypeChange}
          option1="title"
          option2="comment"
          role="Search by"
        />
      </div>
    </header>
  );
}

export default Header;
