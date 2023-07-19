import React, { Component } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import Rating from "@mui/material/Rating";
import { addComment } from "../../api/Api";
import send from "../../assets/send.png";
import styles from "./NewComment.module.css";

class NewComment extends Component {
  state = {
    commentData: "",
    rate: 4,
    loading: false,
  };

  handleTextChange = (e) => {
    this.setState({ commentData: e.target.value });
  };

  sendComment = async (postId) => {
    if (this.state.commentData.trim()) {
      this.setState({ loading: true });
      const updatedComments = await addComment(postId, {
        text: this.state.commentData,
        rating: this.state.rate,
      });
      this.props.updateComments(updatedComments);
      this.setState({ commentData: "", loading: false });
    }
  };

  render() {
    return (
      <div className={styles.commentCont}>
        <div className={styles.ratePart}>
          <span>Rate this post</span>
          <Rating
            sx={{ fontSize: "3rem" }}
            name="simple-controlled"
            value={this.state.rate}
            onChange={(event, newValue) => {
              this.setState({ rate: newValue });
            }}
          />
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Add a new comment..."
          value={this.state.commentData}
          onChange={this.handleTextChange}
        />

        {this.state.loading ? (
          <CircularProgress
            color="warning"
            sx={{ position: "absolute", top: "50%", right: "4%" }}
          />
        ) : (
          <img
            onClick={() => this.sendComment(this.props.id)}
            src={send}
            alt="send"
          />
        )}
      </div>
    );
  }
}

export default NewComment;
