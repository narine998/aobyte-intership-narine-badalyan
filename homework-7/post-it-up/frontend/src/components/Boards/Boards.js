import React, { useEffect, useState } from "react";

import { ActionBar, Layout, PostsContainer } from "../";

import { fetchPosts } from "../../api/Api";
import { findAverageRate, sortObjectsByKey } from "../../helpers/";
import { LEFTBOARD, RIGHTBOARD, RATE } from "../../constants";

import styles from "./Boards.module.scss";

function Boards(props) {
  const [boards, setBoards] = useState({
    [LEFTBOARD]: [],
    [RIGHTBOARD]: [],
  });
  const [pool, setPool] = useState([]);

  useEffect(() => {
    fetchPosts().then((response) => {
      setPool(sortObjectsByKey(findAverageRate(response.data), RATE));
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

      props.disablePost(addedPost.id);
    }
  };

  const clearAllPosts = (place) => {
    boards[place].forEach((post) => {
      props.disablePost(post.id);
    });
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
    props.disablePost(id);
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
    <Layout
      className={`${styles.boardsSection} ${styles.dflex} ${styles.center}`}
    >
      <Layout className={`${styles.dflex} ${styles.boardsContainer}`}>
        <Layout className={styles.board}>
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
        <Layout className={styles.board}>
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
      </Layout>
    </Layout>
  );
}

export default Boards;
