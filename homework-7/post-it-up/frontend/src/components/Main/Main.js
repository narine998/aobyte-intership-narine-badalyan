import React, { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";

import { Boards, Header, PoolSection } from "../";

import { fetchPosts } from "../../api/Api";
import { findAverageRate } from "../../helpers/";

import styles from "./Main.module.scss";

function Main(props) {
  const [dummyPosts, setDummyPosts] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [loading, setLoading] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    fetchPosts().then((response) => {
      setDummyPosts(findAverageRate(response.data));
      setLoading(false);
    });
  }, []);

  const handleInputChange = () => {
    const inputValue = inputRef.current.value;
    setSearchInputValue(inputValue);
  };

  const handleSearchTypeChange = (selectedType) => {
    setSearchType(selectedType);
  };

  const disablePost = (id) => {
    setDummyPosts((prevDummyPosts) => {
      const idx = dummyPosts.findIndex((item) => item.id === id);
      const changedDummyPosts = [...prevDummyPosts];
      changedDummyPosts[idx] = {
        ...changedDummyPosts[idx],
        disabled: !changedDummyPosts[idx].disabled,
      };
      return changedDummyPosts;
    });
  };

  return (
    <>
      <Header
        inputRef={inputRef}
        handleInputChange={handleInputChange}
        handleSearchTypeChange={handleSearchTypeChange}
        searchType={searchType}
      />
      {loading ? (
        <div className={styles.loading}>
          <CircularProgress color="warning" />
        </div>
      ) : (
        <>
          <PoolSection
            dummyPosts={dummyPosts}
            searchInputValue={searchInputValue}
            searchType={searchType}
          />
          <Boards disablePost={disablePost} />
        </>
      )}
    </>
  );
}

export default Main;
