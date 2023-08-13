import React from "react";
import ReactDOM from "react-dom";

import "./popup.css";
import { Popup } from "./popup";

const container: Element =
  window.document.querySelector("#app-container") || window.document.body;

ReactDOM.render(<Popup />, container);
