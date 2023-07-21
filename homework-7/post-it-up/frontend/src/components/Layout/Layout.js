import React from "react";

function Layout(props) {
  return <div className={props.className}>{props.children}</div>;
}

export default Layout;
