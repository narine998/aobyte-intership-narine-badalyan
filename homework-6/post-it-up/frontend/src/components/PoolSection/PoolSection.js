import { Component } from "react";
import { Post, Pagination } from "../";
import { POSTSPERPAGE } from "../../constants/Constant";
import error404 from "../../assets/error.png";
import styles from "./PoolSection.module.css";

class PoolSection extends Component {
  state = { currentPageIndex: 1 };

  handlePageChange = (pageIndex) => {
    if (this.state.currentPageIndex !== pageIndex) {
      this.setState({ currentPageIndex: pageIndex });
    }
  };

  renderPosts = (posts) => {
    return posts.map((post) => <Post key={post.id} post={post} />);
  };

  render() {
    const { searchInputValue, dummyPosts } = this.props;
    const numberOfPages = Math.ceil(dummyPosts.length / POSTSPERPAGE);
    const lastIndex = this.state.currentPageIndex * POSTSPERPAGE;
    const firstIndex = lastIndex - POSTSPERPAGE;
    const currentPagePosts = dummyPosts.slice(firstIndex, lastIndex);

    const searchedDummyPosts = currentPagePosts.filter((post) =>
      post.comments.some((comment) =>
        comment.text
          .toLowerCase()
          .includes(searchInputValue.trim().toLowerCase())
      )
    );

    return searchedDummyPosts.length ? (
      <section className={styles["pool-section"]}>
        <div className={styles["posts-list"]}>
          {this.renderPosts(searchedDummyPosts)}
        </div>
        <Pagination
          pageCount={numberOfPages}
          handlePageChange={this.handlePageChange}
          currentPageIndex={this.state.currentPageIndex}
        />
      </section>
    ) : (
      <div className={styles.error}>
        <img src={error404} alt="error" />
      </div>
    );
  }
}

export default PoolSection;
