import React from "react";

import { PostCard } from "../";

import styles from "./PostsContainer.module.scss";

function PostsContainer(props) {
  const { posts, onDelete } = props;

  return (
    <ul className={styles.card}>
      {posts.map((post) => (
        <PostCard
          post={post}
          key={post.id}
          onDelete={() => onDelete(post.id)}
        />
      ))}
    </ul>
  );
}

export default PostsContainer;
