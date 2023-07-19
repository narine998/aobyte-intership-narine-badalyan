import { Component } from "react";
import { deleteComment } from "../../api/Api";
import styles from "./Comment.module.css";
import rateStar from "../../assets/star.png";
import user from "../../assets/user.png";
import clear from "../../assets/clear.png";

class Comment extends Component {
  handleDeleteComment = async (postId, commentId) => {
    const filteredComments = await deleteComment(postId, commentId);
    this.props.deleteBtnClick(filteredComments.data);
  };

  render() {
    const { text, rating, id } = this.props.comment;
    return (
      <p className={styles.comment}>
        <img className={styles.avatar} src={user} />
        {text}
        <span className={styles.rate}>
          <img src={rateStar} />
          {rating}
        </span>
        <img
          onClick={() => this.handleDeleteComment(this.props.postId, id)}
          src={clear}
          className={styles.deleteBtn}
          alt="clear"
        />
      </p>
    );
  }
}

export default Comment;
