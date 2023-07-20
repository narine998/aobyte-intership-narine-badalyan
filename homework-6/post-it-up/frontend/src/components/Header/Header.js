import { Component } from "react";
import styles from "./Header.module.css";
import favicon from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";

class Header extends Component {
  render() {
    const { inputRef, handleInputChange } = this.props;

    return (
      <header className={styles.header}>
        <a className={styles.favicon}>
          <img src={favicon} alt="favicon" />
        </a>
        <div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by comment..."
            onDragOver={(e) => e.preventDefault()}
            onChange={handleInputChange}
          />
          <img className={styles.search} src={searchIcon} alt="search" />
        </div>
      </header>
    );
  }
}

export default Header;