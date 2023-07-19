import React, { Component } from "react";
import { Comment, NewComment } from "../";
import sortObjectsByKey from "../../helpers/Sort";
import sortUp from "../../assets/sort-up.png";
import sortDown from "../../assets/sort-down.png";
import styles from "./Post.module.css";

class Post extends Component {
  state = {
    openComments: false,
    comments: this.props.post.comments,
    sortUp: true,
  };

  handleShowAllComments = () => {
    this.setState({
      openComments: !this.state.openComments,
    });
  };

  SortUpHandler = () => {
    this.setState({
      sortUp: true,
      comments: sortObjectsByKey(
        this.state.comments,
        "rating",
        this.state.sortUp
      ),
    });
  };

  SortDownHandler = () => {
    this.setState({
      sortUp: false,
      comments: sortObjectsByKey(
        this.state.comments,
        "rating",
        this.state.sortUp
      ),
    });
  };

  updateComments = (updatedComments) => {
    this.setState({
      comments: sortObjectsByKey(updatedComments, "rating", this.state.sortUp),
    });
  };

  deleteComment = (filteredComments) => {
    this.setState({
      comments: sortObjectsByKey(filteredComments, "rating", this.state.sortUp),
    });
  };

  renderComments = () => {
    return this.state.comments.map((comment) => (
      <Comment
        key={comment.id}
        comment={comment}
        postId={this.props.post.id}
        deleteBtnClick={this.deleteComment}
      />
    ));
  };

  render() {
    const { post } = this.props;
    return (
      <div className={post.disabled ? styles.disabled : styles.postBoard}>
        <p className={styles.title}>{post.title}</p>
        <div className={styles.commentBox}>
          <span
            className={styles["comments-text"]}
            onClick={this.handleShowAllComments}
          >
            {this.state.openComments ? "Hide comments" : "See all comments"}
          </span>
          <img onClick={this.SortUpHandler} src={sortUp} alt="sort-up" />
          <img onClick={this.SortDownHandler} src={sortDown} alt="sort-down" />
        </div>

        {this.state.openComments && (
          <>
            {this.renderComments()}
            <NewComment updateComments={this.updateComments} id={post.id} />
          </>
        )}
      </div>
    );
  }
}

export default Post;
