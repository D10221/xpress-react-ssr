import * as React from 'react';

/** */
class App extends React.Component {
  state = {
    mounted: false,
    logo: undefined as string | undefined
  }
  componentDidMount() {
    if (typeof window !== "undefined") {
      require("./index.css");
    }
    this.setState({
      mounted: true,
      logo: require('./logo.svg')
    });
  }
  public render() {
    const { logo, mounted } = this.state;
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
      </div>
    );
  }
}

export default App;
