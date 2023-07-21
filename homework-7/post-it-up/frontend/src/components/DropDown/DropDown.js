import React from "react";

import styles from "./DropDown.module.scss";

function DropDown(props) {
  return (
    <select
      className={styles.select}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    >
      <option value={"descending"}>Order by descending</option>
      <option value={"ascending"}>Order by ascending</option>
    </select>
  );
}

export default DropDown;
