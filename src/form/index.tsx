import React from "react";
import ReactDOM from "react-dom";

import "./form.css";
import { Form } from "./Form";

const container: Element =
  window.document.querySelector("#app-container") || window.document.body;

ReactDOM.render(<Form />, container);
