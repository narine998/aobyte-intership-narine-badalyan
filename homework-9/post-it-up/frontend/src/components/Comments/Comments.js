import React, { useState } from "react";

import { Comment, NewComment } from "../";

import { sortObjectsByKey } from "../../helpers/";

import sortUpPng from "../../assets/sort-up.png";
import sortDownPng from "../../assets/sort-down.png";
import ButtonWrapper from "../../UI/ButtonWrapper";

import { useSelector } from "react-redux";
import { selectSearchValue } from "../../features/search/searchSlice";

import styles from "./Comments.module.scss";

function Comments({ commentData, postId, filteredComments }) {
  const [openComments, setOpenComments] = useState(false);
  const [comments, setComments] = useState(commentData);
  const [sortUp, setSortUp] = useState(null);

  const searchInputValue = useSelector(selectSearchValue);

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

  const deleteComment = (updatedComments) => {
    setComments(sortObjectsByKey(updatedComments, "rating", sortUp));
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
        <span className={styles.commentsText} onClick={showAllComments}>
          {openComments ? "Hide comments" : "See all comments"}
        </span>
        {openComments && (
          <>
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
          </>
        )}
      </div>
      {openComments && (
        <>
          {searchInputValue
            ? renderComments(filteredComments)
            : renderComments(comments)}
          <NewComment updateComments={updateComments} id={postId} />
        </>
      )}
    </div>
  );
}

export default Comments;
