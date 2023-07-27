import React from "react";
import { Link } from "react-router-dom";

import { Comments } from "../";
import Layout from "../../UI/Layout";

import styles from "./Post.module.scss";

function Post({ post }) {
  return (
    <Layout disabled={post.disabled ? "disabled" : ""}>
      <Link to={`/post/${post.id}`}>
        <span className={styles.title}>{post.title}</span>
      </Link>
      <Comments commentData={post.comments} postId={post.id} />
    </Layout>
  );
}

export default Post;
