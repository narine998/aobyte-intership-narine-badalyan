import { Component } from "react";
import Board from "./Board";
import ActionBar from "./ActionsBar";
import PostsContainer from "./PostsContainer";
import styles from "./Main.module.css";
import pool from "../data/postsData";
import findAverageRate from "../helpers/FindAverageRates";
import sortByRate from "../helpers/SortByRate";

const dummyPosts = sortByRate(findAverageRate(pool));

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLeftPosts: [],
      initialRightPosts: [],
      pool: dummyPosts,
      isAscendingLeft: false,
      isAscendingRight: false,
    };
  }

  addPostOnLeft = () => {
    this.setState({
      initialLeftPosts: sortByRate(
        [...this.state.initialLeftPosts, ...this.state.pool.slice(-1)],
        this.state.isAscendingLeft
      ),
      pool: this.state.pool.slice(0, -1),
    });
  };

  addPostOnRight = () => {
    this.setState({
      initialRightPosts: sortByRate(
        [...this.state.initialRightPosts, ...this.state.pool.slice(-1)],
        this.state.isAscendingRight
      ),
      pool: this.state.pool.slice(0, -1),
    });
  };

  clearAllPostsOnRight = () => {
    this.setState({
      pool: sortByRate([...this.state.initialRightPosts, ...this.state.pool]),
      initialRightPosts: [],
    });
  };

  clearAllPostsOnLeft = () => {
    this.setState({
      pool: sortByRate([...this.state.initialLeftPosts, ...this.state.pool]),
      initialLeftPosts: [],
    });
  };

  sortPostsOnLeft = () => {
    this.setState({
      initialLeftPosts: sortByRate(
        this.state.initialLeftPosts,
        !this.state.isAscendingLeft
      ),
      isAscendingLeft: !this.state.isAscendingLeft,
    });
  };

  sortPostsOnRight = () => {
    this.setState({
      initialRightPosts: sortByRate(
        this.state.initialRightPosts,
        !this.state.isAscendingRight
      ),
      isAscendingRight: !this.state.isAscendingRight,
    });
  };

  deletePostOnLeft = (id) => {
    this.setState({
      pool: sortByRate([
        ...this.state.pool,
        this.state.initialLeftPosts.find((item) => item.id === id),
      ]),
      initialLeftPosts: this.state.initialLeftPosts.filter(
        (item) => item.id !== id
      ),
    });
  };

  deletePostOnRight = (id) => {
    this.setState({
      pool: sortByRate([
        ...this.state.pool,
        this.state.initialRightPosts.find((item) => item.id === id),
      ]),
      initialRightPosts: this.state.initialRightPosts.filter(
        (item) => item.id !== id
      ),
    });
  };

  render() {
    return (
      <div className={`${styles.main} ${styles.dflex} ${styles.center}`}>
        <h1 className={styles.heading}>
          Find the posts with the biggest ratings
        </h1>
        <div className={`${styles.dflex} ${styles["boards-container"]}`}>
          <Board>
            <ActionBar
              onAddPost={this.addPostOnLeft}
              onClearAll={this.clearAllPostsOnLeft}
              onSort={this.sortPostsOnLeft}
            />
            <PostsContainer
              posts={this.state.initialLeftPosts}
              onDelete={this.deletePostOnLeft}
            />
          </Board>
          <Board>
            <ActionBar
              onAddPost={this.addPostOnRight}
              onClearAll={this.clearAllPostsOnRight}
              onSort={this.sortPostsOnRight}
            />
            <PostsContainer
              posts={this.state.initialRightPosts}
              onDelete={this.deletePostOnRight}
            />
          </Board>
        </div>
      </div>
    );
  }
}

export default Main;
