import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Comment, NewComment } from "../";
import ButtonWrapper from "../../UI/ButtonWrapper";

import { sortObjectsByKey } from "../../helpers/";
import {
  selectSearchType,
  selectSearchValue,
} from "../../features/search/searchSlice";

import sortUpPng from "../../assets/sort-up.png";
import sortDownPng from "../../assets/sort-down.png";

import styles from "./Comments.module.scss";

function Comments({
  commentData,
  postId,
  filteredComments,
  updatePostComments,
}) {
  const [comments, setComments] = useState(commentData);
  console.log(comments);
  const [sortUp, setSortUp] = useState(null);

  const searchInputValue = useSelector(selectSearchValue);
  const searchType = useSelector(selectSearchType);

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
    updatePostComments(updatedComments);
  };

  const deleteComment = (updatedComments) => {
    setComments(sortObjectsByKey(updatedComments, "rating", sortUp));
    updatePostComments(updatedComments);
  };

  const renderComments = (comments) => {
    if (comments) {
      return comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          postId={postId}
          deleteBtnClick={deleteComment}
        />
      ));
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.commentBox}>
        <ButtonWrapper
          onClick={() => {
            sortComments(true);
          }}
        >
          <img src={sortUpPng} alt="sort-up" />
        </ButtonWrapper>
        <ButtonWrapper onClick={() => sortComments(false)}>
          <img src={sortDownPng} alt="sort-down" />
        </ButtonWrapper>
      </div>
      {searchInputValue && searchType == "comments"
        ? renderComments(filteredComments)
        : renderComments(comments)}
      <NewComment updateComments={updateComments} id={postId} />
    </div>
  );
}

export default Comments;
