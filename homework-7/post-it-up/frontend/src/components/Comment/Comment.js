import React, { useState } from "react";

import { ConfirmDialog } from "../";

import { deleteComment } from "../../api/Api";
import { getElemAtRandomIndex } from "../../helpers/";

import { AVATARS } from "../../constants/";

import rateStar from "../../assets/star.png";
import clear from "../../assets/clear.png";

import styles from "./Comment.module.scss";

function Comment(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [avatar, setAvatar] = useState(getElemAtRandomIndex(AVATARS));

  const handleDeleteComment = async (postId, commentId) => {
    const filteredComments = await deleteComment(postId, commentId);
    props.deleteBtnClick(filteredComments.data);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const { text, rating, id } = props.comment;

  return (
    <p className={styles.comment}>
      <img className={styles.avatar} src={avatar} alt="avatar" />
      {text}
      <span className={styles.rate}>
        <img src={rateStar} alt="rate" />
        {rating}
      </span>
      <ConfirmDialog
        open={openDialog}
        handleClose={handleDialogClose}
        handleDelete={() => handleDeleteComment(props.postId, id)}
      />
      <img
        onClick={() => setOpenDialog(true)}
        src={clear}
        className={styles.deleteBtn}
        alt="clear"
      />
    </p>
  );
}

export default Comment;
