import React, { useEffect, useState } from "react";

import { Comments } from "../";

import { useSelector } from "react-redux";
import { selectSearchValue } from "../../features/search/searchSlice";

import styles from "./SinglePost.module.scss";

function SinglePost({ post }) {
  const [filteredComments, setFilteredComments] = useState([]);
  const searchInputValue = useSelector(selectSearchValue);

  useEffect(() => {
    if (searchInputValue && post.comments) {
      setFilteredComments(
        post.comments.filter((comment) =>
          comment.text
            .toLowerCase()
            .includes(searchInputValue.trim().toLowerCase())
        )
      );
    }
  }, [searchInputValue, post]);

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
      />
    </div>
  );
}

export default SinglePost;
