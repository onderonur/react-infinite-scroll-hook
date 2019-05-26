import React from "react";
import { render } from "react-dom";
import InfiniteList from "./InfiniteList";

function Demo() {
  return (
    <React.Fragment>
      <h1>Infinite List</h1>
      <h3>Created by using "react-infinite-scroll-hook"</h3>
      <InfiniteList />
    </React.Fragment>
  );
}

render(<Demo />, document.querySelector("#demo"));
