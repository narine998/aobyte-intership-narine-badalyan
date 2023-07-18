import { Component } from "react";
import styles from "./Header.module.css";
import favicon from "../../assets/favicon.png";
import searchIcon from "../../assets/search.png";

class Header extends Component {
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("enter pressed");
    }
  };
  render() {
    const { inputRef, handleInputChange } = this.props;
    return (
      <header className={styles.header}>
        <a className={styles.favicon}>
          <img src={favicon} />
        </a>
        <div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by comment..."
            onKeyDown={this.handleKeyDown}
            onChange={handleInputChange}
          />
          <img className={styles.search} src={searchIcon} />
        </div>
      </header>
    );
  }
}

export default Header;
