import React from "react";
import * as ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import NavPage from "./NavPage.jsx";
import Counter from "./Counter.jsx";

const element = (
  <>
    <Router>
      <NavPage />
    </Router>
    <Counter />
  </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element);
