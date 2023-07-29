import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchSinglePost } from "../api/api";
import { Header, Login, SinglePost, Spinner } from "../components";
import { useSelector } from "react-redux";
import { selectLoginOpen } from "../features/loginDialog/loginDialogSlice";

function PostPage(props) {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const isModalOpen = useSelector(selectLoginOpen);

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
