import React from 'react';
import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  async createIssue(issue) {
    const query = `mutation addIssue($issue: AddIssueInput!) {
            addIssue(issue: $issue) {   
                id title owner status effort created
            }
        }`;

    const variables = { issue };

    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    this.setState({
      issues: this.state.issues.concat(result.data.addIssue),
    });
  }

  async loadData() {
    const query = `query {
            issueList {
                id title owner status effort created
            }
        }`;

    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
      }
      this.setState({ issues: result.data.issueList });
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  }

  render() {
    const rowStyle = { border: "1px solid black", margin: 0, padding: 4 };

    return (
      <div>
        <h1>Issue List</h1>
        <IssueFilter />
        <IssueTable allIssues={this.state.issues} style={rowStyle} />
        <IssueAdd newIssue={this.createIssue.bind(this)} />
      </div>
    );
  }
}