import { Component } from "react";
import { Button, DropDown } from "../";
import styles from "./ActionsBar.module.css";

class ActionBar extends Component {
  state = {
    ascending: false,
  };

  render() {
    const { onClearAll, onAddPost, onSort, addBtnDisabled } = this.props;
    return (
      <div className={`${styles["button-cont"]} ${styles["d-flex"]}`}>
        <div className={`${styles.gap} ${styles["d-flex"]}`}>
          <Button onClick={onClearAll}>Clear all</Button>
          <DropDown
            onChange={(value) => {
              this.setState({ ascending: value });
              onSort(value);
            }}
          ></DropDown>
        </div>
        <Button
          disabled={addBtnDisabled}
          onClick={() => {
            onAddPost(this.state.ascending);
          }}
        >
          +
        </Button>
      </div>
    );
  }
}

export default ActionBar;
