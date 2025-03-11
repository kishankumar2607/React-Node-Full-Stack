import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import IssueList from "./IssueList.jsx";
import IssueReport from "./IssueReport.jsx";
import PageNotFound from "./PageNotFound.jsx";

const NavPage = () => {
  return (
    <>
      <nav>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          Home&nbsp;&nbsp;&nbsp;&nbsp;|
        </NavLink>
        <NavLink to="/issues" style={{ textDecoration: "none" }}>
          &nbsp;&nbsp;&nbsp;&nbsp;Issue List&nbsp;&nbsp;&nbsp;&nbsp;|
        </NavLink>
        <NavLink to="/issues/123" style={{ textDecoration: "none" }}>
          &nbsp;&nbsp;&nbsp;&nbsp;Issue List 123&nbsp;&nbsp;&nbsp;&nbsp;|
        </NavLink>
        <NavLink to="/reporters" style={{ textDecoration: "none" }}>
          &nbsp;&nbsp;&nbsp;&nbsp;Reporter List
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issues" element={<IssueList />} />
        <Route path="/issues/:id" element={<IssueList />} />
        <Route path="/reporters" element={<IssueReport />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default NavPage;
