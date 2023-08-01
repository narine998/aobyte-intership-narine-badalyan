import React, { useState } from "react";

import { ConfirmDialog } from "../";

import { deleteComment } from "../../api/api";
import { getElemAtRandomIndex } from "../../helpers/";

import { AVATARS } from "../../constants/";

import rateStar from "../../assets/star.png";
import clear from "../../assets/clear.png";

import styles from "./Comment.module.scss";
import ButtonWrapper from "../../UI/ButtonWrapper";

function Comment({ postId, comment, deleteBtnClick }) {
  const [openDialog, setOpenDialog] = useState(false);
  const avatar = getElemAtRandomIndex(AVATARS);

  const handleDeleteComment = async (postId, commentId) => {
    const filteredComments = await deleteComment(postId, commentId);
    deleteBtnClick(filteredComments.data);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const { text, rating, id } = comment;

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
        handleDelete={() => handleDeleteComment(postId, id)}
      />
      <ButtonWrapper onClick={() => setOpenDialog(true)}>
        <img src={clear} className={styles.deleteBtn} alt="clear" />
      </ButtonWrapper>
    </p>
  );
}

export default Comment;
