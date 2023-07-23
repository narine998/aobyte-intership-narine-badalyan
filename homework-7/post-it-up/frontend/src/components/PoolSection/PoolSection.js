import React, { useEffect, useState } from "react";

import { Post, Pagination, Error, Spinner } from "../";

import { fetchPosts } from "../../api/api";
import { findAverageRate } from "../../helpers/";
import { POSTSPERPAGE } from "../../constants/";

import error404 from "../../assets/error.png";

import styles from "./PoolSection.module.scss";

function PoolSection({ searchInputValue, searchType, disablingIds }) {
  const [dummyPosts, setDummyPosts] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading) {
      fetchPosts()
        .then((response) => {
          setDummyPosts(findAverageRate(response.data));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    } else {
      disablingIds.forEach((id) => {
        setDummyPosts((prevPosts) => {
          const idx = prevPosts.findIndex((item) => item.id === id);
          const nextPosts = [...prevPosts];
          nextPosts[idx] = {
            ...nextPosts[idx],
            disabled: !nextPosts[idx].disabled,
          };
          return nextPosts;
        });
      });
    }
  }, [disablingIds, loading]);

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
      default:
        setFilteredPosts(filterByComments(dummyPosts, searchInputValue));
    }
  }, [searchInputValue, searchType, dummyPosts]);

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
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error className={styles.error} src={error404} />
      ) : (
        <section className={styles.poolSection}>
          <div className={styles.postsList}>
            {searchInputValue.trim() ? (
              filteredPosts.length ? (
                renderPosts(filteredPosts)
              ) : (
                <Error className={styles.error} src={error404} />
              )
            ) : (
              renderPosts(currentPagePosts)
            )}
          </div>
          {!searchInputValue.trim() && (
            <Pagination
              pageCount={Math.ceil(dummyPosts.length / POSTSPERPAGE)}
              handlePageChange={handlePageChange}
              currentPageIndex={currentPageIndex}
            />
          )}
        </section>
      )}
    </>
  );
}

export default PoolSection;
