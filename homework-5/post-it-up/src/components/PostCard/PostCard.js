import { Component } from "react";
import { Button } from "../";
import styles from "./PostCard.module.css";

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
        <Button onClick={this.props.onDelete}>-</Button>
      </li>
    );
  }
}

export default PostCard;
