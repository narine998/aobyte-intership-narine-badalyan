import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import Layout from "../../UI/Layout";

import commentImg from "../../assets/comment.png";
import likePost from "../../assets/like.png";

import styles from "./Post.module.scss";

function Post({ post }) {
  const [openModal, setOpenModal] = useState(false);

  const showCommentModal = () => {
    setOpenModal((prevOpenComments) => !prevOpenComments);
  };

  return (
    <Layout disabled={post.disabled ? "disabled" : ""}>
      <Link to={`/post/${post.id}`}>
        <span className={styles.title}>{post.title}</span>
      </Link>
      <div className={styles.actions}>
        <span>
          <Button>
            <span></span>
            <img src={likePost} alt="like" />
          </Button>
        </span>
        <span>
          <Button onClick={showCommentModal}>
            <span>{post.comments.length || ""}</span>
            <img src={commentImg} alt="comments" />
          </Button>
        </span>
      </div>
      <div>
        <hr />
      </div>
      <div className={styles.commentLikeCont}>
        <Button>
          <img src={likePost} alt="like" />
          Like
        </Button>
        <Button onClick={showCommentModal}>
          <img src={commentImg} alt="comment" />
          Comment
        </Button>
      </div>

      {/* {openModal && (
        <CommentModal
          onClose={showCommentModal}
          commentData={post.comments}
          postId={post.id}
        />
      )} */}
    </Layout>
  );
}

export default Post;
