import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import Layout from "../../UI/Layout";
import Comments from "../Comments/Comments";

import commentImg from "../../assets/comment.png";
import likePost from "../../assets/like.png";

import styles from "./Post.module.scss";

function Post({ post }) {
  const [comments, setComments] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);
  const [briefText, setBriefText] = useState(true);
  const showAllComments = () => {
    setShowComments((prevComments) => !prevComments);
  };

  const updatePostComments = (updatedComments) => {
    setComments(updatedComments);
  };

  const getFullDescription = () => {
    setBriefText((prev) => !prev);
  };

  return (
    <Layout disabled={post.disabled ? "disabled" : ""}>
      <Link to={`/post/${post.id}`}>
        <span className={styles.title}>{post.title}</span>
      </Link>
      <p className={styles.description}>
        {briefText ? post.description.split(".")[0] + "..." : post.description}
        <span onClick={getFullDescription}>{briefText ? "more" : "less"} </span>
      </p>
      <div className={styles.actions}>
        <span>
          <Button>
            <span></span>
            <img src={likePost} alt="like" />
          </Button>
        </span>
        <span>
          <Button onClick={showAllComments}>
            <span>{comments.length || ""}</span>
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
        <Button onClick={showAllComments}>
          <img src={commentImg} alt="comment" />
          Comment
        </Button>
      </div>

      {showComments && (
        <Comments
          commentData={comments}
          postId={post.id}
          updatePostComments={updatePostComments}
        />
      )}
    </Layout>
  );
}

export default Post;
