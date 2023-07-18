import { Component } from "react";
import { Comment, Pagination } from "../";
import { POSTSPERPAGE } from "../../constants/Constant";
import styles from "./PoolSection.module.css";

class PoolSection extends Component {
  state = { currentPageIndex: 1 };

  handlePageChange = (pageIndex) => {
    if (this.state.currentPageIndex !== pageIndex) {
      this.setState({ currentPageIndex: pageIndex });
    }
  };

  renderComments = (comments) => {
    return comments.map((comment) => (
      <Comment key={comment.id} text={comment.text} rating={comment.rating} />
    ));
  };

  renderPosts = (posts) => {
    return posts.map((post) => (
      <div key={post.id} className={post.disabled ? styles.disabled : ""}>
        <p className={styles.title}>{post.title}</p>
        <span className={styles["comments-text"]}>Comments...</span>
        {this.renderComments(post.comments)}
      </div>
    ));
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

    return (
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
    );
  }
}

export default PoolSection;
