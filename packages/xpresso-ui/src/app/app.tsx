import * as React from "react";
import logo from "./logo.svg";
import ssr from "../ssr";
import "./index.css";
/** */
class App extends React.Component {
  state = {
    logo: undefined as string | undefined,
    req: {}
  };
  /** */
  async componentDidMount() {
    this.setState({
      logo,
      req: ssr()
    });
  }
  /** */
  public render() {
    const { logo, req } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        <p className="App-intro">
          To get started, edit ... save ... wait a bit. .. and press F5 to
          reload.
        </p>
        <div style={{ margin: "1rem", padding: "1rem", textAlign: "left" }}>
          <div>SSR: </div>
          <pre>
            {JSON.stringify(req, null, 2).replace(/(\{|\}|\,|\")/gi, "")}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;