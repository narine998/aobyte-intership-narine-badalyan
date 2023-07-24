import { Component } from "react";
import { ConfirmDialog } from "../";
import { deleteComment } from "../../api/Api";
import { getElemAtRandomIndex } from "../../helpers/getElemAtRandomIndex";
import { AVATARS } from "../../constants/Constant";
import rateStar from "../../assets/star.png";
import clear from "../../assets/clear.png";
import styles from "./Comment.module.css";

class Comment extends Component {
  state = {
    openDialog: false,
    avatar: getElemAtRandomIndex(AVATARS),
  };

  handleDeleteComment = async (postId, commentId) => {
    const filteredComments = await deleteComment(postId, commentId);
    this.props.deleteBtnClick(filteredComments.data);
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false });
  };

  render() {
    const { text, rating, id } = this.props.comment;

    return (
      <p className={styles.comment}>
        <img className={styles.avatar} src={this.state.avatar} alt="avatar" />
        {text}
        <span className={styles.rate}>
          <img src={rateStar} alt="rate" />
          {rating}
        </span>
        <ConfirmDialog
          open={this.state.openDialog}
          handleClose={this.handleDialogClose}
          handleDelete={() => this.handleDeleteComment(this.props.postId, id)}
        />
        <img
          onClick={() => this.setState({ openDialog: true })}
          src={clear}
          className={styles.deleteBtn}
          alt="clear"
        />
      </p>
    );
  }
}

export default Comment;
