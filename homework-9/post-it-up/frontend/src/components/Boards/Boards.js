import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ActionBar, PostsContainer } from "../";
import Layout from "../../UI/Layout";

import { fetchPosts } from "../../api/api";
import { findAverageRate, sortObjectsByKey } from "../../helpers/";
import { LEFTBOARD, RIGHTBOARD, RATE } from "../../constants";
import { disablePool } from "../../features/pool/poolSlice";

import styles from "./Boards.module.scss";

function Boards() {
  const [boards, setBoards] = useState({
    [LEFTBOARD]: [],
    [RIGHTBOARD]: [],
  });
  const [pool, setPool] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPosts().then((response) => {
      const ratedPosts = findAverageRate(response.data ?? []).filter(
        (post) => post.rate
      );
      setPool(sortObjectsByKey(ratedPosts, RATE));
    });
  }, []);

  const addPost = (place, order) => {
    if (pool.length) {
      let addedPost;
      let direction;
      if (order === "ascending") {
        direction = true;
        addedPost = pool[0];
        setPool((prevPool) => prevPool.slice(1));
      } else {
        direction = false;
        addedPost = pool[pool.length - 1];
        setPool((prevPool) => prevPool.slice(0, -1));
      }

      setBoards((prevBoards) => {
        return {
          ...prevBoards,
          [place]: sortObjectsByKey(
            [...prevBoards[place], addedPost],
            RATE,
            direction
          ),
        };
      });

      dispatch(disablePool([addedPost.id]));
    }
  };

  const clearAllPosts = (place) => {
    const ids = boards[place].map((post) => post.id);
    dispatch(disablePool(ids));
    setPool((prevPool) =>
      sortObjectsByKey([...boards[place], ...prevPool], RATE, true)
    );
    setBoards((prevBoards) => {
      return { ...prevBoards, [place]: [] };
    });
  };

  const sortPosts = (place, order) => {
    const sortOrder = order === "ascending" ? true : false;
    setBoards((prevBoards) => {
      return {
        ...prevBoards,
        [place]: sortObjectsByKey(prevBoards[place], RATE, sortOrder),
      };
    });
  };

  const deletePost = (place, id) => {
    dispatch(disablePool([id]));
    setPool((prevPool) =>
      sortObjectsByKey(
        [...prevPool, boards[place].find((item) => item.id === id)],
        RATE,
        true
      )
    );
    setBoards((prevBoards) => {
      return {
        ...prevBoards,
        [place]: prevBoards[place].filter((item) => item.id !== id),
      };
    });
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
