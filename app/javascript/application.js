import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

document.addEventListener("DOMContentLoaded", () => {
   ReactDOM.render(<App />, document.getElementById("root"))
});
