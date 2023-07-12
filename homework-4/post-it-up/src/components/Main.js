import { Component } from "react";
import Board from "./Board";
import ActionBar from "./ActionsBar";
import PostsContainer from "./PostsContainer";
import styles from "./Main.module.css";
import pool from "../data/postsData";
import findAverageRate from "../helpers/FindAverageRates";
import sortByRate from "../helpers/SortByRate";

const dummyPosts = sortByRate(findAverageRate(pool), true);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftBoard: [],
      rightBoard: [],
      pool: dummyPosts,
    };
  }

  addPost = (place, order) => {
    if (order === "ascending") {
      this.setState({
        [place]: sortByRate([...this.state[place], this.state.pool[0]], true),
        pool: this.state.pool.slice(1),
      });
    } else {
      this.setState({
        [place]: sortByRate(
          [...this.state[place], this.state.pool[this.state.pool.length - 1]],
          false
        ),
        pool: this.state.pool.slice(0, -1),
      });
    }
  };

  clearAllPosts = (place) => {
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
      <div className={`${styles.main} ${styles.dflex} ${styles.center}`}>
        <h1 className={styles.heading}>
          Find the posts with the biggest ratings
        </h1>
        <div className={`${styles.dflex} ${styles["boards-container"]}`}>
          <Board>
            <ActionBar
              onAddPost={(order) => this.addPost("leftBoard", order)}
              onClearAll={() => this.clearAllPosts("leftBoard")}
              onSort={(order) => this.sortPosts("leftBoard", order)}
            />
            <PostsContainer
              posts={this.state.leftBoard}
              onDelete={(id) => this.deletePost("leftBoard", id)}
            />
          </Board>
          <Board>
            <ActionBar
              onAddPost={(order) => this.addPost("rightBoard", order)}
              onClearAll={() => this.clearAllPosts("rightBoard")}
              onSort={(order) => this.sortPosts("rightBoard", order)}
            />
            <PostsContainer
              posts={this.state["rightBoard"]}
              onDelete={(id) => this.deletePost("rightBoard", id)}
            />
          </Board>
        </div>
      </div>
    );
  }
}

export default Main;
