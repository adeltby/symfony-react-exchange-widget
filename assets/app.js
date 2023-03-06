import "./styles/app.css";
import React, { Component } from "react";

import ReactDOM from "react-dom/client";
import ExchangeRate from "./components/ExchangeRate";
//import Main from './components/Main';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<ExchangeRate />);
