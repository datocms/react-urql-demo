import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import App from "./components/App";
import { Provider } from "urql";
import client from "./client";

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById("root")
);
