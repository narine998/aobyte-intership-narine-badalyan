import React from "react";
import { useSelector } from "react-redux";

import { Boards, Header, PoolSection, Login } from "../components/";

import { selectLoginOpen } from "../features/loginDialog/loginDialogSlice";

function Home(props) {
  const isModalOpen = useSelector(selectLoginOpen);

  return (
    <>
      {isModalOpen && <Login />}
      <Header />
      <PoolSection />
      <Boards />
    </>
  );
}

export default Home;
