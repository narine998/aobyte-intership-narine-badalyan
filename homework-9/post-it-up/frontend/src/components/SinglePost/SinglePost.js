import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

import { selectSearchValue } from "../../features/search/searchSlice";
import { Comments } from "../";

import commentImg from "../../assets/comment.png";
import likePost from "../../assets/like.png";

import styles from "./SinglePost.module.scss";

function SinglePost({ post }) {
  const [comments, setComments] = useState(post.comments);
  const [filteredComments, setFilteredComments] = useState([]);
  const searchInputValue = useSelector(selectSearchValue);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (searchInputValue && post.comments) {
      setFilteredComments(
        post.comments.filter((comment) =>
          comment.text
            .toLowerCase()
            .includes(searchInputValue.trim().toLowerCase())
        )
      );
    }
  }, [searchInputValue, post]);

  const showAllComments = () => {
    setShowComments((prevOpenComments) => !prevOpenComments);
  };

  const updatePostComments = (updatedComments) => {
    setComments(updatedComments);
  };

  return (
    <div className={styles.singlePost}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.description}>{post.description}</p>
      <div className={styles.postImage}>
        {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      </div>
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
          filteredComments={filteredComments}
          updatePostComments={updatePostComments}
        />
      )}
    </div>
  );
}

export default SinglePost;
