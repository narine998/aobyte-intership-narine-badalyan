import { Component } from "react";

import { DropDown } from "../";

import clear from "../../assets/redo.png";
import add from "../../assets/add.png";

import styles from "./ActionsBar.module.scss";

class ActionBar extends Component {
  state = {
    ascending: false,
  };

  render() {
    const { onClearAll, onAddPost, onSort, addBtnDisabled } = this.props;
    return (
      <div className={`${styles["button-cont"]} ${styles["d-flex"]}`}>
        <div className={`${styles.gap} ${styles["d-flex"]}`}>
          <img
            className={styles.clear}
            src={clear}
            onClick={onClearAll}
            alt="clear all"
          />
          <DropDown
            onChange={(value) => {
              this.setState({ ascending: value });
              onSort(value);
            }}
          ></DropDown>
        </div>
        <img
          className={addBtnDisabled ? styles.disabled : styles.addBtn}
          onClick={() => {
            onAddPost(this.state.ascending);
          }}
          src={add}
          alt="add"
        />
      </div>
    );
  }
}

export default ActionBar;
