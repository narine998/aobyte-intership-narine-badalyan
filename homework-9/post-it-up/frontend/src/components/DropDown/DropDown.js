import React from "react";

import { useDispatch } from "react-redux";
import { setSearchType } from "../../features/search/searchSlice";

import styles from "./DropDown.module.scss";

function DropDown({ option1, option2, role }) {
  const dispatch = useDispatch();
  const handleSearchTypeChange = (e) => {
    dispatch(setSearchType(e.target.value));
  };

  return (
    <select
      className={styles.select}
      onChange={(e) => {
        handleSearchTypeChange(e);
      }}
    >
      <option value={option1}>
        {role} {option1}
      </option>
      <option value={option2}>
        {role} {option2}
      </option>
    </select>
  );
}

export default DropDown;
