import { Component } from "react";
import React from "react";
/** 
 *  Client Side after rehydrate
 */
export default class App extends Component {
  state = {
    mounted: false,
    clicks: 0
  };
  componentDidMount() {
    this.setState({ mounted: true });
  }
  onClick = () => {
    const { clicks } = this.state;
    this.setState({
      clicks: clicks + 1
    });
  };
  render() {
    const { mounted, clicks } = this.state;
    return (
      <div>
        <div>Hello {mounted && "(mounted)"}</div>
        <div>Clicks: {clicks}</div>
        <div>
          <button onClick={this.onClick}>CLick Me</button>
        </div>
      </div>
    );
  }
}
