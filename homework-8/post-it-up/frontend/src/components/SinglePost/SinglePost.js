import React, { useEffect, useState } from "react";

import { Comments } from "../";

import styles from "./SinglePost.module.scss";

function SinglePost({ post, searchInputValue }) {
  const [filteredComments, setFilteredComments] = useState([]);

  useEffect(() => {
    if (searchInputValue) {
      setFilteredComments(
        post.comments.filter((comment) =>
          comment.text
            .toLowerCase()
            .includes(searchInputValue.trim().toLowerCase())
        )
      );
    }
  }, [searchInputValue, post.comments]);

  return (
    <div className={styles.singlePost}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.description}>{post.description}</p>
      <div className={styles.postImage}>
        {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      </div>
      <Comments
        commentData={post.comments}
        postId={post.id}
        filteredComments={filteredComments}
        searchInputValue={searchInputValue}
      />
    </div>
  );
}

export default SinglePost;
