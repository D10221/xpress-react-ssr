import * as React from 'react';
let logo: any = null;
if (typeof window !== "undefined") {
  require("./index.css");
  logo = require('./logo.svg');
}
/** */
class App extends React.Component {
  public render() {
    console.log(logo)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
