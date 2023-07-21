import { Component } from "react";

import deleteImg from "../../assets/delete.png";

import styles from "./PostCard.module.scss";

class PostCard extends Component {
  render() {
    const { title, rate, face } = this.props.post;
    return (
      <li className={styles["post-card"]}>
        <div className={styles["post-cont"]}>
          <span className={styles.title}>{title}</span>
          <span className={styles["comment-rate"]}>
            The average rate of this post is {rate} {face}
          </span>
        </div>
        <img
          className={styles.deleteBtn}
          src={deleteImg}
          onClick={this.props.onDelete}
          alt="delete"
        />
      </li>
    );
  }
}

export default PostCard;
