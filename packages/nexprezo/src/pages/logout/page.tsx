import React, { Component } from "react";
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
      <div>
        <h1>Logout Page</h1>
      </div>
    );
  }
}
