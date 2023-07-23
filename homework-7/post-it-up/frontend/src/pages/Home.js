import React, { useRef, useState } from "react";

import { Boards, Header, PoolSection, Login } from "../components/";
import useDisableBodyScroll from "../hooks/UseDisableBodyScroll";

function Home(props) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [disablingIds, setDisablingIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);

  useDisableBodyScroll(isModalOpen);

  const changeDisablingIds = (idList) => {
    setDisablingIds(idList);
  };

  const handleInputChange = () => {
    const inputValue = inputRef.current.value;
    setSearchInputValue(inputValue);
  };

  const handleSearchTypeChange = (selectedType) => {
    setSearchType(selectedType);
  };

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && <Login handleLoginModalClose={handleLoginModalClose} />}
      <Header
        inputRef={inputRef}
        handleInputChange={handleInputChange}
        handleSearchTypeChange={handleSearchTypeChange}
        searchType={searchType}
        handleLoginClick={handleLoginClick}
      />
      <PoolSection
        searchInputValue={searchInputValue}
        searchType={searchType}
        disablingIds={disablingIds}
      />
      <Boards getSelectedPostIds={changeDisablingIds} />
    </>
  );
}

export default Home;
