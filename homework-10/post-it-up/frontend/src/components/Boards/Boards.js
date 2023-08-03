import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ActionBar, PostsContainer } from "../";
import Layout from "../../UI/Layout";

import { LEFTBOARD, RIGHTBOARD } from "../../constants";
import { disablePool } from "../../features/pool/poolSlice";

import styles from "./Boards.module.scss";
import {
  addBoardPost,
  clearBoard,
  deleteBoardPost,
  getBoardPosts,
  sortBoard,
} from "../../features/board/boardSlice";

function Boards() {
  const { board: pool, ...boards } = useSelector(getBoardPosts);
  const dispatch = useDispatch();

  const addPost = (place, order) => {
    if (pool.length) {
      const id = order === "ascending" ? pool[0].id : pool[pool.length - 1].id;
      dispatch(addBoardPost(place, order));
      dispatch(disablePool([id]));
    }
  };

  const clearAllPosts = (place) => {
    const ids = boards[place].map((post) => post.id);
    dispatch(clearBoard(place));
    dispatch(disablePool(ids));
  };

  const deletePost = (place, id) => {
    dispatch(deleteBoardPost(place, id));
    dispatch(disablePool([id]));
  };

  const sortPosts = (place, order) => {
    dispatch(sortBoard(place, order));
  };

  return (
    <section className={styles.boardsSection}>
      <div style={{ width: "45%" }}>
        <Layout>
          <ActionBar
            onAddPost={(order) => addPost(LEFTBOARD, order)}
            onClearAll={() => clearAllPosts(LEFTBOARD)}
            onSort={(order) => sortPosts(LEFTBOARD, order)}
            addBtnDisabled={!pool.length}
          />
          <PostsContainer
            posts={boards[LEFTBOARD]}
            onDelete={(id) => deletePost(LEFTBOARD, id)}
          />
        </Layout>
      </div>
      <div style={{ width: "45%" }}>
        <Layout>
          <ActionBar
            onAddPost={(order) => addPost(RIGHTBOARD, order)}
            onClearAll={() => clearAllPosts(RIGHTBOARD)}
            onSort={(order) => sortPosts(RIGHTBOARD, order)}
            addBtnDisabled={!pool.length}
          />
          <PostsContainer
            posts={boards[RIGHTBOARD]}
            onDelete={(id) => deletePost(RIGHTBOARD, id)}
          />
        </Layout>
      </div>
    </section>
  );
}

export default Boards;
