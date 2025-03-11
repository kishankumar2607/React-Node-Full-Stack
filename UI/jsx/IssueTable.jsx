import React from "react";

export default class IssueTable extends React.Component {
    render() {
      const issueRows = (this.props.allIssues || [])
        .filter((anIssue) => anIssue != null)
        .map((anIssue) => (
          <IssueRow key={anIssue.id} issue={anIssue} mystyle={this.props.style} />
        ));
  
      return (
        <div title="Outer div">
          <table>
            <thead>
              <tr>
                <th style={this.props.style}>ID</th>
                <th style={this.props.style}>Title</th>
                <th style={this.props.style}>Owner</th>
                <th style={this.props.style}>Status</th>
                <th style={this.props.style}>Effort</th>
                <th style={this.props.style}>Created On</th>
              </tr>
            </thead>
            <tbody>{issueRows}</tbody>
          </table>
          <button onClick={this.update}>Update</button>
        </div>
      );
    }
  }
  
class IssueRow extends React.Component {
    render() {
      return (
        <tr key={this.props.issue.id}>
          <td style={this.props.mystyle}>{this.props.issue.id}</td>
          <td style={this.props.mystyle}>{this.props.issue.title}</td>
          <td style={this.props.mystyle}>{this.props.issue.owner}</td>
          <td style={this.props.mystyle}>{this.props.issue.status}</td>
          <td style={this.props.mystyle}>{this.props.issue.effort}</td>
          <td style={this.props.mystyle}>
            {new Date(this.props.issue.created).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </td>
        </tr>
      );
    }
  }