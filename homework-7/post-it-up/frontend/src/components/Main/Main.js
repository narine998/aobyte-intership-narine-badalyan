import React, { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";

import { Boards, Header, PoolSection } from "../";

import { fetchPosts } from "../../api/Api";
import { findAverageRate } from "../../helpers/";

import styles from "./Main.module.scss";

function Main(props) {
  const [dummyPosts, setDummyPosts] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
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

  const disablePost = (id) => {
    const idx = dummyPosts.findIndex((item) => item.id === id);
    const changedDummyPosts = [...dummyPosts];
    changedDummyPosts[idx] = {
      ...changedDummyPosts[idx],
      disabled: !changedDummyPosts[idx].disabled,
    };

    setDummyPosts(changedDummyPosts);
  };

  return (
    <>
      <Header inputRef={inputRef} handleInputChange={handleInputChange} />
      {loading && (
        <div className={styles.loading}>
          <CircularProgress color="warning" />
        </div>
      )}
      {!loading && (
        <>
          <PoolSection
            dummyPosts={dummyPosts}
            searchInputValue={searchInputValue}
          />
          <Boards disablePost={disablePost} />
        </>
      )}
    </>
  );
}

export default Main;
