import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchSinglePost } from "../api/api";
import { Header, Post, Spinner } from "../components";

function PostPage(props) {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

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
      {!loading && (
        <>
          <Header />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "14rem auto",
            }}
          >
            <Post post={post} />
          </div>
        </>
      )}
    </>
  );
}

export default PostPage;
