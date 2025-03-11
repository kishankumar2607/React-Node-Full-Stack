import React from "react";

export default class IssueAdd extends React.Component {
    constructor() {
      super();
      this.insertIssue = this.insertIssue.bind(this);
    }
  
    insertIssue(e) {
      e.preventDefault();
      const form = document.forms.AddIssue;
      const issue = {
        title: form.title.value,
        owner: form.owner.value,
        status: "New",
        effort: 1,
        created: new Date(),
      };
      this.props.newIssue(issue);
  
      form.title.value = "";
      form.owner.value = "";
    }
  
    render() {
      return (
        <form name="AddIssue" onSubmit={this.insertIssue}>
          <input type="text" name="title" placeholder="Title" />
          <input type="text" name="owner" placeholder="Owner" />
          <input type="submit" name="Add" value="Add" />
        </form>
      );
    }
  }