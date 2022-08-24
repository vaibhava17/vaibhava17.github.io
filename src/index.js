import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./global.css";
import "./responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "antd/dist/antd.css";
require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
