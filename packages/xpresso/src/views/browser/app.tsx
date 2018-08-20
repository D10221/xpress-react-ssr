import * as React from 'react';
/** */
class App extends React.Component {
  state = {
    mounted: false,
    logo: undefined as string | undefined,
    req: {}
  }

  componentDidMount() {
    require("./index.css");
    const req = require("./ssr").default();
    this.setState({
      mounted: true,
      logo: require('./logo.svg'),
      req
    });
  }
  public render() {
    const { logo, mounted, req } = this.state;
    if (!mounted) {
      return "... loading"
    }
    return mounted && (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit ... and save to reload.
        </p>
        <div style={{ margin: "1rem", padding: "1rem", textAlign: "left" }}>
          <div>SSR: </div>
          <pre>{JSON.stringify(req, null, 2).replace(/(\{|\}|\,|\")/gi, "")}</pre>
        </div>
      </div>
    );
  }
}

export default App;
