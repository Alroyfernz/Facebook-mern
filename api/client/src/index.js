import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import App from "./App";

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
