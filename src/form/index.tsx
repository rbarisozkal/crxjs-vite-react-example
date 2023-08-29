import React from "react";
import ReactDOM from "react-dom";

import "./form.css";
import { Form } from "./Form";

export function setupExtensionMessageListener(messageHandler) {
  window.addEventListener("message", (event) => {
    if (event.source === window && event.data.fromExtension) {
      const receivedMessage = event.data.message;
      console.log(receivedMessage);
      messageHandler(receivedMessage);
    }
  });
}
// const container: Element =
//   window.document.querySelector("#app-container") || window.document.body;

// ReactDOM.render(<Form />, container);
