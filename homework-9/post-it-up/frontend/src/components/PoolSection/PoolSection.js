import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Post, Pagination, Error } from "../";

import { POSTSPERPAGE } from "../../constants/";

import { selectPoolData } from "../../features/pool/poolSlice";
import {
  selectSearchType,
  selectSearchValue,
} from "../../features/search/searchSlice";

import error404 from "../../assets/error.png";

import styles from "./PoolSection.module.scss";

function PoolSection(props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const { pool } = useSelector(selectPoolData);
  const searchInputValue = useSelector(selectSearchValue);
  const searchType = useSelector(selectSearchType);

  useEffect(() => {
    switch (searchType) {
      case "comment":
        setFilteredPosts(filterByComments(pool, searchInputValue));
        break;
      case "title":
        setFilteredPosts(
          pool.filter((post) =>
            post.title
              .toLowerCase()
              .includes(searchInputValue.trim().toLowerCase())
          )
        );
        break;
    }
  }, [searchInputValue, searchType, pool]);

  const handlePageChange = (pageIndex) => {
    if (currentPageIndex !== pageIndex) {
      setCurrentPageIndex(pageIndex);
    }
  };

  const renderPosts = (posts) => {
    return posts.map((post) => <Post key={post.id} post={post} />);
  };

  const filterByComments = (posts, searchInputValue) => {
    return posts.filter((post) => {
      if (post.comments) {
        return post.comments.some((comment) =>
          comment.text
            .toLowerCase()
            .includes(searchInputValue.trim().toLowerCase())
        );
      }
      return false;
    });
  };

  const getCurrentPagePosts = (posts) => {
    const lastIndex = currentPageIndex * POSTSPERPAGE;
    const firstIndex = lastIndex - POSTSPERPAGE;
    return posts.slice(firstIndex, lastIndex);
  };

  const currentPagePosts = getCurrentPagePosts(pool);

  if (searchInputValue) {
    return (
      <section className={styles.poolSection}>
        <div className={styles.postsList}>
          {filteredPosts.length ? (
            renderPosts(filteredPosts)
          ) : (
            <Error>
              <img src={error404} alt="error" />
            </Error>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.poolSection}>
      <div className={styles.postsList}>{renderPosts(currentPagePosts)}</div>
      <Pagination
        pageCount={Math.ceil(pool.length / POSTSPERPAGE)}
        handlePageChange={handlePageChange}
        currentPageIndex={currentPageIndex}
      />
    </section>
  );
}

export default PoolSection;
