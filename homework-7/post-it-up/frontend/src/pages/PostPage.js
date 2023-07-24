import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchSinglePost } from "../api/api";
import { Header, Login, Post, Spinner } from "../components";

function PostPage(props) {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = () => {
    const inputValue = inputRef.current.value;
    setSearchInputValue(inputValue);
  };

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchSinglePost(postId)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [postId]);

  return (
    <>
      {loading && <Spinner />}
      {isModalOpen && <Login handleLoginModalClose={handleLoginModalClose} />}
      {!loading && (
        <>
          <Header
            inputRef={inputRef}
            handleInputChange={handleInputChange}
            handleLoginClick={handleLoginClick}
            searchType="comments"
            onePost={true}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "14rem auto",
            }}
          >
            <Post
              post={post}
              searchInputValue={searchInputValue}
              singlePost="singlePost"
            />
          </div>
        </>
      )}
    </>
  );
}

export default PostPage;
