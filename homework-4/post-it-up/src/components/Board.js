import React, { Component } from "react";
import styles from "./Board.module.css";

class Board extends Component {
  render() {
    return <div className={styles.container}>{this.props.children}</div>;
  }
}

export default Board;
