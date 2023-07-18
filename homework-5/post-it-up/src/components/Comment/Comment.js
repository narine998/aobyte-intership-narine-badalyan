import { Component } from "react";
import styles from "./Comment.module.css";
import rateStar from "../../assets/star.png";
import user from "../../assets/user.png";

class Comment extends Component {
  render() {
    const { text, rating } = this.props;
    return (
      <p className={styles.comment}>
        <img className={styles.avatar} src={user} />
        {text}
        <span className={styles.rate}>
          <img src={rateStar} />
          {rating}
        </span>
      </p>
    );
  }
}

export default Comment;
