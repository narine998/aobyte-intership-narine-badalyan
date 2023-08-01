import React from "react";

import deleteImg from "../../assets/delete.png";

import styles from "./PostCard.module.scss";
import { useNavigate } from "react-router-dom";
import ButtonWrapper from "../../UI/ButtonWrapper";

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
      <ButtonWrapper onClick={props.onDelete}>
        <img className={styles.deleteBtn} src={deleteImg} alt="delete" />
      </ButtonWrapper>
    </li>
  );
}

export default PostCard;
