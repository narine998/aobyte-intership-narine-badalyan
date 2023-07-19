import { Component } from "react";
import styles from "./Button.module.css";

class Button extends Component {
  render() {
    return (
      <button className={this.props.className} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
