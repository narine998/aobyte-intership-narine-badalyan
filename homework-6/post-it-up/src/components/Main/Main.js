import React, { Component } from "react";
import { Boards, Header, PoolSection } from "../";
import pool from "../../data/postsData";
import findAverageRate from "../../helpers/FindAverageRates";

const dummyPosts = findAverageRate(pool);

class Main extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      dummyPosts: dummyPosts,
      searchInputValue: "",
    };
  }

  handleInputChange = () => {
    const searchInputValue = this.inputRef.current.value;
    this.setState({ searchInputValue });
  };

  disablePost = (id) => {
    this.setState((prevState) => {
      const searchIndex = prevState.dummyPosts.findIndex(
        (item) => item.id === id
      );
      const changedDummyPosts = [...prevState.dummyPosts];
      changedDummyPosts[searchIndex] = {
        ...changedDummyPosts[searchIndex],
        disabled: !changedDummyPosts[searchIndex].disabled,
      };
      return {
        ...prevState,
        dummyPosts: changedDummyPosts,
      };
    });
  };

  render() {
    return (
      <>
        <Header
          inputRef={this.inputRef}
          handleInputChange={this.handleInputChange}
        />
        <PoolSection
          dummyPosts={this.state.dummyPosts}
          searchInputValue={this.state.searchInputValue}
        />
        <Boards disablePost={this.disablePost} />
      </>
    );
  }
}

export default Main;
