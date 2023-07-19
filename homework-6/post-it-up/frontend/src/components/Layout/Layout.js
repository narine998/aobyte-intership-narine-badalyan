import { Component } from "react";

class Layout extends Component {
  render() {
    return <div className={this.props.className}>{this.props.children}</div>;
  }
}

export default Layout;
