import React, { Component } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { Boards, Header, PoolSection } from "../";
import { fetchPosts } from "../../api/Api";
import findAverageRate from "../../helpers/FindAverageRates";
import styles from "./Main.module.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      dummyPosts: [],
      searchInputValue: "",
      loading: true,
    };
  }

  componentDidMount() {
    fetchPosts().then((response) => {
      this.setState({
        dummyPosts: findAverageRate(response.data),
        loading: false,
      });
    });
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
        {this.state.loading && (
          <div className={styles.loading}>
            <CircularProgress color="warning" />
          </div>
        )}
        {!this.state.loading && (
          <>
            <PoolSection
              dummyPosts={this.state.dummyPosts}
              searchInputValue={this.state.searchInputValue}
            />
            <Boards disablePost={this.disablePost} />
          </>
        )}
      </>
    );
  }
}

export default Main;
