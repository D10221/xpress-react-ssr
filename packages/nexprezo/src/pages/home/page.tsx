import React, { Component } from "react";

const isWindow = typeof window !== "undefined";
const logo =isWindow && require("./logo.svg");
isWindow && require("./page.css");
/**
 * ?
 */
export default class Home extends Component {
  state = {
    mounted: false
  };
  async componentDidMount() {
    this.setState({
      mounted: true
    });
  }
  render() {
    const { mounted } = this.state;
    if (!mounted) return null;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        <p className="App-intro">
          To get started, edit pages/*.
      </p>
        <div style={{ margin: "1rem", padding: "1rem", textAlign: "left" }}>
          <div>Props: </div>
          <pre>
            {JSON.stringify(this.props, null, 2).replace(/(\{|\}|\,|\")/gi, "")}
          </pre>
        </div>
      </div>
    );
  }
}
