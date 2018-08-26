import * as React from "react";
import logo from "./logo.svg";
import "./index.css";
/** */
class App extends React.Component {
  /** */
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        <p className="App-intro">
          To get started, edit app/view.tsx.
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

export default App;
