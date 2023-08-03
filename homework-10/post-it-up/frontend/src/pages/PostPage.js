import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSinglePost } from "../api/api";

import { Header, Login, SinglePost } from "../components";

import { selectLoginOpen } from "../features/loginDialog/loginDialogSlice";
import { setSearchType, setSearchValue } from "../features/search/searchSlice";

function PostPage(props) {
  const isModalOpen = useSelector(selectLoginOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchType("comments"));
    dispatch(setSearchValue(""));
  }, [dispatch]);

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
        <SinglePost />
      </div>
    </>
  );
}

export default PostPage;

export const loader = async ({ request, params }) => {
  const postId = params.postId;
  const response = await fetchSinglePost(postId);
  return response.data;
};
