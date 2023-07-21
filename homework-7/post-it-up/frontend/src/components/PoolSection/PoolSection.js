import React, { useState } from "react";

import { Post, Pagination } from "../";

import { POSTSPERPAGE } from "../../constants/";

import error404 from "../../assets/error.png";

import styles from "./PoolSection.module.scss";

function PoolSection(props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const handlePageChange = (pageIndex) => {
    if (currentPageIndex !== pageIndex) {
      setCurrentPageIndex(pageIndex);
    }
  };

  const renderPosts = (posts) => {
    return posts.map((post) => <Post key={post.id} post={post} />);
  };

  const { searchInputValue, dummyPosts } = props;
  const numberOfPages = Math.ceil(dummyPosts.length / POSTSPERPAGE);
  const lastIndex = currentPageIndex * POSTSPERPAGE;
  const firstIndex = lastIndex - POSTSPERPAGE;
  const currentPagePosts = dummyPosts.slice(firstIndex, lastIndex);

  const searchedDummyPosts = currentPagePosts.filter((post) =>
    post.comments.some((comment) =>
      comment.text.toLowerCase().includes(searchInputValue.trim().toLowerCase())
    )
  );
  return searchedDummyPosts.length ? (
    <section className={styles.poolSection}>
      <div className={styles.postsList}>{renderPosts(searchedDummyPosts)}</div>
      <Pagination
        pageCount={numberOfPages}
        handlePageChange={handlePageChange}
        currentPageIndex={currentPageIndex}
      />
    </section>
  ) : (
    <div className={styles.error}>
      <img src={error404} alt="error" />
    </div>
  );
}

export default PoolSection;
