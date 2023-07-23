import React, { useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import Rating from "@mui/material/Rating";

import { addComment } from "../../api/api";

import send from "../../assets/send.png";

import styles from "./NewComment.module.scss";

function NewComment(props) {
  const [commentData, setCommentData] = useState("");
  const [rate, setRate] = useState(4);
  const [sending, setSending] = useState(false);

  const handleTextChange = (e) => {
    setCommentData(e.target.value);
  };

  const sendComment = async (postId) => {
    if (commentData.trim()) {
      setSending(true);
      const updatedComments = await addComment(postId, {
        text: commentData,
        rating: rate,
      });
      props.updateComments(updatedComments);
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
        <img onClick={() => sendComment(props.id)} src={send} alt="send" />
      )}
    </div>
  );
}

export default NewComment;
