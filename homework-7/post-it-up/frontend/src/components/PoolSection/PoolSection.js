import React, { useEffect, useState } from "react";

import { Post, Pagination } from "../";

import { POSTSPERPAGE } from "../../constants/";

import error404 from "../../assets/error.png";

import styles from "./PoolSection.module.scss";

function PoolSection({ searchInputValue, searchType, dummyPosts }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    switch (searchType) {
      case "comment":
        setFilteredPosts(filterByComments(dummyPosts, searchInputValue));
        break;
      case "title":
        setFilteredPosts(
          dummyPosts.filter((post) =>
            post.title
              .toLowerCase()
              .includes(searchInputValue.trim().toLowerCase())
          )
        );
        break;
    }
  }, [searchInputValue, searchType]);

  const handlePageChange = (pageIndex) => {
    if (currentPageIndex !== pageIndex) {
      setCurrentPageIndex(pageIndex);
    }
  };

  const renderPosts = (posts) => {
    return posts.map((post) => <Post key={post.id} post={post} />);
  };

  const filterByComments = (posts, searchInputValue) => {
    return posts.filter((post) =>
      post.comments.some((comment) =>
        comment.text
          .toLowerCase()
          .includes(searchInputValue.trim().toLowerCase())
      )
    );
  };

  const getCurrentPagePosts = (posts) => {
    const lastIndex = currentPageIndex * POSTSPERPAGE;
    const firstIndex = lastIndex - POSTSPERPAGE;
    return posts.slice(firstIndex, lastIndex);
  };

  const currentPagePosts = getCurrentPagePosts(dummyPosts);

  return (
    <>
      {searchInputValue.trim() && !filteredPosts.length && (
        <div className={styles.error}>
          <img src={error404} alt="error" />
        </div>
      )}
      <section className={styles.poolSection}>
        <div className={styles.postsList}>
          {searchInputValue.trim()
            ? renderPosts(filteredPosts)
            : renderPosts(currentPagePosts)}
        </div>
        {!searchInputValue.trim() && (
          <Pagination
            pageCount={Math.ceil(dummyPosts.length / POSTSPERPAGE)}
            handlePageChange={handlePageChange}
            currentPageIndex={currentPageIndex}
          />
        )}
      </section>
    </>
  );
}

export default PoolSection;
