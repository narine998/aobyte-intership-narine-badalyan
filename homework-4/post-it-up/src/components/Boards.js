import { Component } from "react";
import styles from "./Boards.module.css";
import pool from "../data/postsData";
import findAverageRate from "../helpers/FindAverageRates";
import sortByRate from "../helpers/SortByRate";
import Layout from "./Layout";
import ActionBar from "./ActionsBar";
import PostsContainer from "./PostsContainer";

const sortedPool = sortByRate(findAverageRate(pool), true);

class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftBoard: [],
      rightBoard: [],
      pool: sortedPool,
    };
  }

  addPost = (place, order) => {
    let addedPost = {};

    if (order === "ascending") {
      addedPost = this.state.pool[0];
      this.setState({
        [place]: sortByRate([...this.state[place], this.state.pool[0]], true),
        pool: this.state.pool.slice(1),
      });
    } else {
      addedPost = this.state.pool[this.state.pool.length - 1];
      this.setState({
        [place]: sortByRate(
          [...this.state[place], this.state.pool[this.state.pool.length - 1]],
          false
        ),
        pool: this.state.pool.slice(0, -1),
      });
    }

    this.props.disablePost(addedPost.id);
  };

  clearAllPosts = (place) => {
    this.state[place].forEach((post) => {
      this.props.disablePost(post.id);
    });
    this.setState({
      pool: sortByRate([...this.state[place], ...this.state.pool], true),
      [place]: [],
    });
  };

  sortPosts = (place, order) => {
    let sortOrder = order === "ascending" ? true : false;
    this.setState({
      [place]: sortByRate(this.state[place], sortOrder),
    });
  };

  deletePost = (place, id) => {
    this.props.disablePost(id);
    this.setState({
      pool: sortByRate(
        [...this.state.pool, this.state[place].find((item) => item.id === id)],
        true
      ),
      [place]: this.state[place].filter((item) => item.id !== id),
    });
  };

  render() {
    return (
      <Layout
        className={`${styles["boards-section"]} ${styles.dflex} ${styles.center}`}
      >
        <h1 className={styles.heading}>
          Find the posts with the biggest ratings
        </h1>
        <Layout className={`${styles.dflex} ${styles["boards-container"]}`}>
          <Layout className={styles.board}>
            <ActionBar
              onAddPost={(order) => this.addPost("leftBoard", order)}
              onClearAll={() => this.clearAllPosts("leftBoard")}
              onSort={(order) => this.sortPosts("leftBoard", order)}
            />
            <PostsContainer
              posts={this.state.leftBoard}
              onDelete={(id) => this.deletePost("leftBoard", id)}
            />
          </Layout>
          <Layout className={styles.board}>
            <ActionBar
              onAddPost={(order) => this.addPost("rightBoard", order)}
              onClearAll={() => this.clearAllPosts("rightBoard")}
              onSort={(order) => this.sortPosts("rightBoard", order)}
            />
            <PostsContainer
              posts={this.state["rightBoard"]}
              onDelete={(id) => this.deletePost("rightBoard", id)}
            />
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Boards;
