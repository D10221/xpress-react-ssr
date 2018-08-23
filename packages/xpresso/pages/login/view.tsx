import * as React from "react";
import ssr from "../ssr";
import "./index.css";
interface ViewState {
  req: {};
  username: string;
  password: string;
}
/** */
class View extends React.Component {
  state: ViewState = {
    req: {},
    username: "",
    password: ""
  };
  /** */
  async componentDidMount() {
    this.setState({
      req: ssr()
    });
  }
  login = () => {};
  /** */
  public render() {
    const { req } = this.state;
    return (
      <div className="view">
        <div className="view-content">
          <header className="view-header">
            <h1 className="view-title">Login</h1>
          </header>
          <div className="view-input-box">
            <label className="view-input-label" htmlFor="user">
              User
            </label>
            <input
              id="username"
              className="view-input"
              value={this.state.username}
              onChange={e => {
                this.setState({
                  username: e.target.value
                });
              }}
            />
          </div>
          <div className="view-input-box">
            <label className="view-input-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="view-input"
              type="password"
              value={this.state.password}
              onChange={e => {
                this.setState({
                  password: e.target.value
                });
              }}
            />
          </div>
          <div className="view-actions">
            <button className="view-button" onClick={this.login}>
              Login
            </button>
          </div>
        </div>
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

export default View;
