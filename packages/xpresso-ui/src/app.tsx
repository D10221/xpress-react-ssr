import * as React from "react";
import logo from "./logo.svg";
import ssr from "./ssr";
/** */
class App extends React.Component {
  state = {
    mounted: false,
    logo: undefined as string | undefined,
    req: {}
  };

  async componentDidMount() {
    require("./index.css");    
    this.setState({
      mounted: true,
      logo,
      req: ssr()
    });
  }
  
  public render() {
    const { logo, mounted, req } = this.state;
    if (!mounted) {
      return "... loading";
    }
    return (
      mounted && (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome</h1>
          </header>
          <p className="App-intro">
            To get started, edit ... save ... wait a bit. .. and press F5 to reload.
          </p>
          <div style={{ margin: "1rem", padding: "1rem", textAlign: "left" }}>
            <div>SSR: </div>
            <pre>
              {JSON.stringify(req, null, 2).replace(/(\{|\}|\,|\")/gi, "")}
            </pre>
          </div>
        </div>
      )
    );
  }
}

export default App;
