import React, { useState } from "react";

import { DropDown } from "../";
import ButtonWrapper from "../../UI/ButtonWrapper";

import clear from "../../assets/redo.png";
import add from "../../assets/add.png";

import styles from "./ActionsBar.module.scss";

function ActionsBar({ onClearAll, onAddPost, onSort, addBtnDisabled }) {
  const [ascending, setAscending] = useState(false);

  return (
    <div className={`${styles.buttonCont} ${styles.dFlex}`}>
      <div className={`${styles.gap} ${styles.dFlex}`}>
        <ButtonWrapper onClick={onClearAll}>
          <img className={styles.clear} src={clear} alt="clear all" />
        </ButtonWrapper>
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
      <ButtonWrapper
        onClick={() => {
          onAddPost(ascending);
        }}
      >
        <img
          className={addBtnDisabled ? styles.disabled : styles.addBtn}
          src={add}
          alt="add"
        />
      </ButtonWrapper>
    </div>
  );
}

export default ActionsBar;
