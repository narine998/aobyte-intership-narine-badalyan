import React, { useState } from "react";

import { Comment, NewComment } from "../";

import { sortObjectsByKey } from "../../helpers/";

import sortUpPng from "../../assets/sort-up.png";
import sortDownPng from "../../assets/sort-down.png";

import styles from "./Post.module.scss";

function Post(props) {
  const [openComments, setOpenComments] = useState(false);
  const [comments, setComments] = useState(props.post.comments);
  const [sortUp, setSortUp] = useState(true);

  const showAllComments = () => {
    setOpenComments((prevOpenComments) => !prevOpenComments);
  };

  const sortUpHandler = () => {
    setSortUp(true);
    setComments((prevComments) =>
      sortObjectsByKey(prevComments, "rating", sortUp)
    );
  };

  const sortDownHandler = () => {
    setSortUp(false);
    setComments((prevComments) =>
      sortObjectsByKey(prevComments, "rating", sortUp)
    );
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
        postId={props.post.id}
        deleteBtnClick={deleteComment}
      />
    ));
  };

  const { post } = props;
  return (
    <div
      className={
        post.disabled
          ? `${styles.disabled} ${styles.postBoard}`
          : styles.postBoard
      }
    >
      <p className={styles.title}>{post.title}</p>
      <div className={styles.commentBox}>
        <span className={styles["comments-text"]} onClick={showAllComments}>
          {openComments ? "Hide comments" : "See all comments"}
        </span>
        <img onClick={sortUpHandler} src={sortUpPng} alt="sort-up" />
        <img onClick={sortDownHandler} src={sortDownPng} alt="sort-down" />
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
