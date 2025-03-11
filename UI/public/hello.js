let continents = ["Asia", "Europe", "Africa", "Australia", "Antarctica", "America", "ABCD"];
class Hello extends React.Component {
  render() {
    const rowStyle = {
      border: "1px solid black",
      margin: 0,
      padding: 4
    };
    const tworows = continents.map((continent, index) => {
      return /*#__PURE__*/React.createElement("tr", {
        key: index
      }, /*#__PURE__*/React.createElement("td", {
        style: rowStyle
      }, "Hello"), /*#__PURE__*/React.createElement("td", {
        style: rowStyle
      }, continent));
    });
    return /*#__PURE__*/React.createElement("div", {
      title: "Outer div"
    }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "MSG"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Continent"))), /*#__PURE__*/React.createElement("tbody", null, tworows)), /*#__PURE__*/React.createElement("button", {
      onClick: this.update
    }, "Update"));
  }

  // update() {
  //     continents.push("New Continent");
  //     this.shouldComponentUpdate();
  // }
}
const element = /*#__PURE__*/React.createElement(Hello, null);
ReactDOM.render(element, document.getElementById("contents"));