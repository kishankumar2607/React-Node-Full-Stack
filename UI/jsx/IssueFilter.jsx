import React from "react";

export default class IssueFilter extends React.Component {
    render() {
      return (
        <div>
          <input type="text" placeholder="Search..." />
          <input type="button" value="Search" />
        </div>
      );
    }
  }