import React from "react";

import deleteImg from "../../assets/delete.png";

import styles from "./PostCard.module.scss";

function PostCard(props) {
  const { title, rate, face } = props.post;
  return (
    <li className={styles.postCard}>
      <div className={styles.postCont}>
        <span className={styles.title}>{title}</span>
        <span>
          The average rate of this post is {rate} {face}
        </span>
      </div>
      <img
        className={styles.deleteBtn}
        src={deleteImg}
        onClick={props.onDelete}
        alt="delete"
      />
    </li>
  );
}

export default PostCard;
