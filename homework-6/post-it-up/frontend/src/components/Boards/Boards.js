import { Component } from "react";
import { ActionBar, Layout, PostsContainer } from "../";
import { fetchPosts } from "../../api/Api";
import findAverageRate from "../../helpers/FindAverageRates";
import sortObjectsByKey from "../../helpers/Sort";
import styles from "./Boards.module.css";

class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftBoard: [],
      rightBoard: [],
      pool: [],
    };
  }

  componentDidMount() {
    fetchPosts().then((response) => {
      this.setState({
        pool: sortObjectsByKey(findAverageRate(response.data), "rate"),
      });
    });
  }

  addPost = (place, order) => {
    if (this.state.pool.length) {
      let addedPost = {};
      if (order === "ascending") {
        addedPost = this.state.pool[0];
        this.setState({
          [place]: sortObjectsByKey(
            [...this.state[place], this.state.pool[0]],
            "rate",
            true
          ),
          pool: this.state.pool.slice(1),
        });
      } else {
        addedPost = this.state.pool[this.state.pool.length - 1];
        this.setState({
          [place]: sortObjectsByKey(
            [...this.state[place], this.state.pool[this.state.pool.length - 1]],
            "rate",
            false
          ),
          pool: this.state.pool.slice(0, -1),
        });
      }
      this.props.disablePost(addedPost.id);
    }
  };

  clearAllPosts = (place) => {
    this.state[place].forEach((post) => {
      this.props.disablePost(post.id);
    });
    this.setState({
      pool: sortObjectsByKey(
        [...this.state[place], ...this.state.pool],
        "rate",
        true
      ),
      [place]: [],
    });
  };

  sortPosts = (place, order) => {
    let sortOrder = order === "ascending" ? true : false;
    this.setState({
      [place]: sortObjectsByKey(this.state[place], "rate", sortOrder),
    });
  };

  deletePost = (place, id) => {
    this.props.disablePost(id);
    this.setState({
      pool: sortObjectsByKey(
        [...this.state.pool, this.state[place].find((item) => item.id === id)],
        "rate",
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
        <Layout className={`${styles.dflex} ${styles["boards-container"]}`}>
          <Layout className={styles.board}>
            <ActionBar
              onAddPost={(order) => this.addPost("leftBoard", order)}
              onClearAll={() => this.clearAllPosts("leftBoard")}
              onSort={(order) => this.sortPosts("leftBoard", order)}
              addBtnDisabled={!this.state.pool.length}
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
              addBtnDisabled={!this.state.pool.length}
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
