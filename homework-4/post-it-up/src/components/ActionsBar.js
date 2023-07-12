import { Component } from "react";
import Button from "./Button";
import styles from "./ActionsBar.module.css";
import DropDown from "./DropDown";

class ActionBar extends Component {
  state = {
    ascending: false,
  };

  render() {
    return (
      <div className={`${styles["button-cont"]} ${styles["d-flex"]}`}>
        <div className={`${styles.gap} ${styles["d-flex"]}`}>
          <Button onClick={this.props.onClearAll}>Clear all</Button>
          <DropDown
            onChange={(value) => {
              this.setState({ ascending: value });
              this.props.onSort(value);
            }}
          ></DropDown>
        </div>
        <Button
          onClick={() => {
            this.props.onAddPost(this.state.ascending);
          }}
        >
          +
        </Button>
      </div>
    );
  }
}

export default ActionBar;
