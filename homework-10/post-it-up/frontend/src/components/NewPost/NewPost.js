import React, { useState } from "react";
import { Button } from "@mui/material";

import styles from "./NewPost.module.scss";
import { addPost } from "../../api/api";
import { Link } from "react-router-dom";
import { HOME_PATH } from "../../constants";

function NewPost(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      description,
      imageFile: image,
    };
    try {
      await addPost(postData);
      setIsSuccess(true);
      setTitle("");
      setDescription("");
      setImage("");
      setMessage("Post successfully created");
    } catch (err) {
      setIsSuccess(false);
      setMessage("Sorry! Something went wrong \u{1F614}");
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <legend>Create a New Post</legend>
        <div>
          <textarea
            value={title}
            placeholder="Write a title"
            onChange={onTitleChange}
          />
        </div>
        <div>
          <textarea
            value={description}
            placeholder="Write a description"
            onChange={onDescriptionChange}
          />
        </div>
        <div>
          <input type="file" onChange={onFileChange} />
        </div>
        <div>
          <Button disabled={isSuccess} type="submit">
            Publish Post
          </Button>
        </div>
        <div className={styles.successMessage}>
          <span className={isSuccess ? styles.success : styles.error}>
            {message}
          </span>
          <Link to={HOME_PATH}>&rarr; Home</Link>
        </div>
      </form>
    </div>
  );
}

export default NewPost;
