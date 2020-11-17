import React from "react";
import { withRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Routes from "./Routes";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Nunito", sans-serif;
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes />
    </div>
  );
}

export default withRouter(App);
