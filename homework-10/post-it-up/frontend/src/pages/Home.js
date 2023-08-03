import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Boards,
  Header,
  PoolSection,
  Login,
  Spinner,
  Error,
} from "../components/";

import { selectLoginOpen } from "../features/loginDialog/loginDialogSlice";
import { setSearchType } from "../features/search/searchSlice";
import { loadPool, selectPoolData } from "../features/pool/poolSlice";
import { useNavigation } from "react-router-dom";

function Home(props) {
  const isModalOpen = useSelector(selectLoginOpen);
  const { loading, error } = useSelector(selectPoolData);
  const navigation = useNavigation();
  const isSingePostLoading = navigation.state === "loading";

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      dispatch(loadPool());
    }
  }, [loading, dispatch]);

  useEffect(() => {
    dispatch(setSearchType("title"));
  }, []);

  if (loading || isSingePostLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isModalOpen && <Login />}
      <Header />
      {!error ? (
        <>
          <PoolSection />
          <Boards />
        </>
      ) : (
        <Error>{error}</Error>
      )}
    </>
  );
}

export default Home;
