import { Component } from "react";
import Button from "./Button";
import styles from "./ActionsBar.module.css";

class ActionBar extends Component {
  render() {
    return (
      <div className={`${styles["button-cont"]} ${styles["d-flex"]}`}>
        <div className={`${styles.gap} ${styles["d-flex"]}`}>
          <Button onClick={this.props.onClearAll}>Clear all</Button>
          <Button onClick={this.props.onSort}>Sort</Button>
        </div>
        <Button onClick={this.props.onAddPost}>+</Button>
      </div>
    );
  }
}

export default ActionBar;
