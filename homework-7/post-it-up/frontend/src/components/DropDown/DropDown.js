import { Component } from "react";

import styles from "./DropDown.module.scss";

class DropDown extends Component {
  render() {
    return (
      <select
        className={styles.select}
        onChange={(e) => {
          this.props.onChange(e.target.value);
        }}
      >
        <option value={"descending"}>Order by descending</option>
        <option value={"ascending"}>Order by ascending</option>
      </select>
    );
  }
}

export default DropDown;
