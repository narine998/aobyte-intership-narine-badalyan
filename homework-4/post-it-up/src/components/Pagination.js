import { Component } from "react";
import styles from "./Pagination.module.css";

class Pagination extends Component {
  render() {
    const { pageCount, handlePageChange, currentPageIndex } = this.props;
    console.log(currentPageIndex);
    const pageArr = " ".repeat(pageCount - 1).split(" ");
    return (
      <ul className={styles.pagination}>
        {pageArr.map((item, index) => (
          <li key={index}>
            <a
              className={
                currentPageIndex === index + 1 ? styles.currentPage : ""
              }
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

export default Pagination;
