import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchSinglePost } from "../api/api";

import { Header, Login, SinglePost, Spinner } from "../components";

import { selectLoginOpen } from "../features/loginDialog/loginDialogSlice";
import { setSearchType, setSearchValue } from "../features/search/searchSlice";

function PostPage(props) {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const isModalOpen = useSelector(selectLoginOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchType("comments"));
    dispatch(setSearchValue(""));
  }, []);

  useEffect(() => {
    fetchSinglePost(postId)
      .then((response) => {
        setPost(response.data);
      })
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {isModalOpen && <Login />}
      <Header onePost={true} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "14rem auto",
        }}
      >
        <SinglePost post={post} />
      </div>
    </>
  );
}

export default PostPage;
