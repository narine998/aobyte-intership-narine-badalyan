import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Comment, NewComment } from "../";

import { sortObjectsByKey } from "../../helpers/";

import sortUpPng from "../../assets/sort-up.png";
import sortDownPng from "../../assets/sort-down.png";

import styles from "./Post.module.scss";

function Post({ post }) {
  const [openComments, setOpenComments] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [sortUp, setSortUp] = useState(null);

  const showAllComments = () => {
    setOpenComments((prevOpenComments) => !prevOpenComments);
  };

  const sortComments = (direction) => {
    if (direction !== sortUp) {
      setSortUp(direction);
      setComments((prevComments) =>
        sortObjectsByKey(prevComments, "rating", direction)
      );
    }
  };

  const updateComments = (updatedComments) => {
    setComments(sortObjectsByKey(updatedComments, "rating", sortUp));
  };

  const deleteComment = (filteredComments) => {
    setComments(sortObjectsByKey(filteredComments, "rating", sortUp));
  };

  const renderComments = () => {
    return comments.map((comment) => (
      <Comment
        key={comment.id}
        comment={comment}
        postId={post.id}
        deleteBtnClick={deleteComment}
      />
    ));
  };

  return (
    <div
      className={
        post.disabled
          ? `${styles.disabled} ${styles.postBoard}`
          : styles.postBoard
      }
    >
      <Link to={`/post/${post.id}`}>
        <p className={styles.title}>{post.title}</p>
      </Link>
      <div className={styles.commentBox}>
        <span className={styles.commentsText} onClick={showAllComments}>
          {openComments ? "Hide comments" : "See all comments"}
        </span>
        <img
          onClick={() => {
            sortComments(true);
          }}
          src={sortUpPng}
          alt="sort-up"
        />
        <img
          onClick={() => sortComments(false)}
          src={sortDownPng}
          alt="sort-down"
        />
      </div>

      {openComments && (
        <>
          {renderComments()}
          <NewComment updateComments={updateComments} id={post.id} />
        </>
      )}
    </div>
  );
}

export default Post;
