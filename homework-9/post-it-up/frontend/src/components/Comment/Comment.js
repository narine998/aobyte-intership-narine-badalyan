import React, { useState } from "react";
import { Button } from "@mui/material";

import { ConfirmDialog, ReplyModal } from "../";
import ButtonWrapper from "../../UI/ButtonWrapper";

import { deleteComment, likeComment } from "../../api/api";
import { getElemAtRandomIndex } from "../../helpers/";

import { AVATARS } from "../../constants/";

import rateStar from "../../assets/star.png";
import clear from "../../assets/clear.png";
import likeImg from "../../assets/like.png";
import replyImg from "../../assets/reply.png";
import hide from "../../assets/hide.png";

import styles from "./Comment.module.scss";

function Comment({ postId, comment, deleteBtnClick }) {
  const [avatar, setAvatar] = useState(getElemAtRandomIndex(AVATARS));
  const [openDialog, setOpenDialog] = useState(false);
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const [allReplies, setAllReplies] = useState([]);
  const [likes, setLikes] = useState(0);

  const { text, rating, id } = comment;

  const handleDeleteComment = async (postId, commentId) => {
    const filteredComments = await deleteComment(postId, commentId);
    deleteBtnClick(filteredComments.data);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // const handleLikeClick = () => {
  //   likeComment(postId, id, { likes: likes + 1 }).then((resp) => {
  //     setLikes((prevLikes) => prevLikes + 1);
  //     console.log(resp);
  //   });
  // };

  const handleReplyClick = () => {
    setOpenReplyModal((prevReply) => !prevReply);
    setAllReplies(comment.replies);
  };

  const updateReplies = (replies) => {
    setAllReplies(replies);
  };

  const renderReplies = () => {
    if (allReplies) {
      return allReplies.map((reply) => <li key={reply.id}>{reply.text}</li>);
    }
  };

  return (
    <>
      <div className={styles.comment}>
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
      </div>
      <div className={styles.replyComment}>
        <div className={styles.actionBox}>
          <span>
            <img src={likeImg} alt="like" />
            {likes ? likes : ""}
          </span>
          <Button onClick={handleReplyClick}>
            {openReplyModal ? (
              <img src={hide} alt="hide-comments" />
            ) : (
              <img src={replyImg} alt="reply" />
            )}
          </Button>
        </div>
        {openReplyModal && (
          <ReplyModal
            onClose={handleReplyClick}
            renderReplies={renderReplies}
            updateReplies={updateReplies}
            postId={postId}
            commentId={id}
          />
        )}
      </div>
    </>
  );
}

export default Comment;
