import { Component } from "react";

import { PostCard } from "../";

import styles from "./PostsContainer.module.scss";

class PostsContainer extends Component {
  render() {
    return (
      <ul className={styles.card}>
        {this.props.posts.map((post) => (
          <PostCard
            post={post}
            key={post.id}
            onDelete={() => this.props.onDelete(post.id)}
          />
        ))}
      </ul>
    );
  }
}

export default PostsContainer;
