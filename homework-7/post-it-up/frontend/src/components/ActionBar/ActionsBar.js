import React, { useState } from "react";

import { DropDown } from "../";

import clear from "../../assets/redo.png";
import add from "../../assets/add.png";

import styles from "./ActionsBar.module.scss";

function ActionsBar({ onClearAll, onAddPost, onSort, addBtnDisabled }) {
  const [ascending, setAscending] = useState(false);

  return (
    <div className={`${styles.buttonCont} ${styles.dFlex}`}>
      <div className={`${styles.gap} ${styles.dFlex}`}>
        <img
          className={styles.clear}
          src={clear}
          onClick={onClearAll}
          alt="clear all"
        />
        <DropDown
          onChange={(value) => {
            setAscending(value);
            onSort(value);
          }}
          option1="descending"
          option2="ascending"
          role="Order by"
        />
      </div>
      <img
        className={addBtnDisabled ? styles.disabled : styles.addBtn}
        onClick={() => {
          onAddPost(ascending);
        }}
        src={add}
        alt="add"
      />
    </div>
  );
}

export default ActionsBar;
