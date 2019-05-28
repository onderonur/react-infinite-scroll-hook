import React from "react";
import { render } from "react-dom";
import InfiniteList from "./InfiniteList";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    height: 3000px;
    width: 3000px;
  }
`;

const ListContainer = styled.div`
  max-height: 600px;
  max-width: 600px;
  overflow: auto;
  background-color: #e4e4e4;
`;

function Demo() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <h1>Infinite List</h1>
      <h3>Created by using "react-infinite-scroll-hook"</h3>
      <ListContainer>
        <InfiniteList />
      </ListContainer>
    </React.Fragment>
  );
}

render(<Demo />, document.querySelector("#demo"));
