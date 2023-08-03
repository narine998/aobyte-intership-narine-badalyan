import React, { useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { useDispatch } from "react-redux";
import Rating from "@mui/material/Rating";

import { sendNewComment } from "../../features/pool/poolSlice";

import ButtonWrapper from "../../UI/ButtonWrapper";

import send from "../../assets/send.png";

import styles from "./NewComment.module.scss";

function NewComment({ id, sortDir }) {
  const [commentData, setCommentData] = useState("");
  const [rate, setRate] = useState(4);
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();

  const handleTextChange = (e) => {
    setCommentData(e.target.value);
  };

  const sendComment = (postId) => {
    if (commentData.trim()) {
      setSending(true);
      dispatch(sendNewComment(postId, commentData, sortDir, rate));
      setCommentData("");
      setSending(false);
    }
  };

  return (
    <div className={styles.commentCont}>
      <div className={styles.ratePart}>
        <span>Rate this post</span>
        <Rating
          sx={{ fontSize: "3rem" }}
          name="simple-controlled"
          value={rate}
          onChange={(event, newValue) => {
            setRate(newValue);
          }}
        />
      </div>
      <textarea
        className={styles.textarea}
        placeholder="Add a new comment..."
        value={commentData}
        onChange={handleTextChange}
      />

      {sending ? (
        <CircularProgress
          color="warning"
          sx={{ position: "absolute", top: "50%", right: "4%" }}
        />
      ) : (
        <ButtonWrapper onClick={() => sendComment(id)}>
          <img src={send} alt="send" />
        </ButtonWrapper>
      )}
    </div>
  );
}

export default NewComment;
