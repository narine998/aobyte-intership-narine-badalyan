import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Comment, NewComment } from "../";
import ButtonWrapper from "../../UI/ButtonWrapper";

import { sortPostComments } from "../../features/pool/poolSlice";
import {
  selectSearchType,
  selectSearchValue,
} from "../../features/search/searchSlice";

import sortUpPng from "../../assets/sort-up.png";
import sortDownPng from "../../assets/sort-down.png";

import styles from "./Comments.module.scss";

function Comments({ commentData, postId, filteredComments }) {
  const [sortUp, setSortUp] = useState(null);
  const searchInputValue = useSelector(selectSearchValue);
  const searchType = useSelector(selectSearchType);
  const dispatch = useDispatch();

  const sortComments = (direction) => {
    if (direction !== sortUp) {
      setSortUp(direction);
      dispatch(sortPostComments(direction, postId));
    }
  };

  const renderComments = (comments) => {
    if (comments) {
      return comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          postId={postId}
          sortDir={sortUp}
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
        <ButtonWrapper
          onClick={() => {
            sortComments(false);
          }}
        >
          <img src={sortDownPng} alt="sort-down" />
        </ButtonWrapper>
      </div>
      {searchInputValue && searchType === "comments"
        ? renderComments(filteredComments)
        : renderComments(commentData)}
      <NewComment id={postId} sortDir={sortUp} />
    </div>
  );
}

export default Comments;
