class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: []
    };
  }
  componentDidMount() {
    this.loadData();
  }
  async createIssue(issue) {
    // issue.id = this.state.issues.length + 1;

    const query = `mutation addIssue($issue: AddIssueInput!) {
            addIssue(issue: $issue) {   
                id title owner status effort created
            }
        }`;
    const variables = {
      issue
    };
    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    const result = await response.json();

    // await this.loadData();

    this.setState({
      issues: this.state.issues.concat(result.data.addIssue)
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
      }
      this.setState({
        issues: result.data.issueList
      });
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  }
  render() {
    const rowStyle = {
      border: "1px solid black",
      margin: 0,
      padding: 4
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Issue List"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement(IssueTable, {
      allIssues: this.state.issues,
      style: rowStyle
    }), /*#__PURE__*/React.createElement(IssueAdd, {
      newIssue: this.createIssue.bind(this)
    }));
  }
}
class IssueFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      type: "text",
      placeholder: "Search..."
    }), /*#__PURE__*/React.createElement("input", {
      type: "button",
      value: "Search"
    }));
  }
}
class IssueTable extends React.Component {
  render() {
    const issueRows = (this.props.allIssues || []).filter(anIssue => anIssue != null).map(anIssue => /*#__PURE__*/React.createElement(IssueRow, {
      key: anIssue.id,
      issue: anIssue,
      mystyle: this.props.style
    }));
    return /*#__PURE__*/React.createElement("div", {
      title: "Outer div"
    }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      style: this.props.style
    }, "ID"), /*#__PURE__*/React.createElement("th", {
      style: this.props.style
    }, "Title"), /*#__PURE__*/React.createElement("th", {
      style: this.props.style
    }, "Owner"), /*#__PURE__*/React.createElement("th", {
      style: this.props.style
    }, "Status"), /*#__PURE__*/React.createElement("th", {
      style: this.props.style
    }, "Effort"), /*#__PURE__*/React.createElement("th", {
      style: this.props.style
    }, "Created On"))), /*#__PURE__*/React.createElement("tbody", null, issueRows)), /*#__PURE__*/React.createElement("button", {
      onClick: this.update
    }, "Update"));
  }
}
class IssueRow extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("tr", {
      key: this.props.issue.id
    }, /*#__PURE__*/React.createElement("td", {
      style: this.props.mystyle
    }, this.props.issue.id), /*#__PURE__*/React.createElement("td", {
      style: this.props.mystyle
    }, this.props.issue.title), /*#__PURE__*/React.createElement("td", {
      style: this.props.mystyle
    }, this.props.issue.owner), /*#__PURE__*/React.createElement("td", {
      style: this.props.mystyle
    }, this.props.issue.status), /*#__PURE__*/React.createElement("td", {
      style: this.props.mystyle
    }, this.props.issue.effort), /*#__PURE__*/React.createElement("td", {
      style: this.props.mystyle
    }, new Date(this.props.issue.created).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })));
  }
}
class IssueAdd extends React.Component {
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
      created: new Date()
    };
    this.props.newIssue(issue);
    form.title.value = "";
    form.owner.value = "";
  }
  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "AddIssue",
      onSubmit: this.insertIssue
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "title",
      placeholder: "Title"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "owner",
      placeholder: "Owner"
    }), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      name: "Add",
      value: "Add"
    }));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(IssueList, null), document.getElementById("contents"));