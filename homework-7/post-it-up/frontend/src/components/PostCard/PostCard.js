import React from "react";

import deleteImg from "../../assets/delete.png";

import styles from "./PostCard.module.scss";
import { useNavigate } from "react-router-dom";

function PostCard(props) {
  const { title, rate, face, id } = props.post;
  const navigate = useNavigate();

  const showCompletePost = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <li className={styles.postCard}>
      <div className={styles.postCont} onClick={() => showCompletePost(id)}>
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
