import * as React from "react";
import ssr from "../ssr";
import "./index.css";
interface ViewState {
  mounted: boolean;
  req: {},
  username: string;
  password: string;
}
/** */
class View extends React.Component {
  state: ViewState = {
    mounted: false,
    req: {},
    username: "",
    password: ""
  };
  /** */
  async componentDidMount() {
    this.setState({
      mounted: true,
      req: ssr()
    });
  }
  login = () => {

  }
  /** */
  public render() {
    const { mounted, req } = this.state;
    if (!mounted) {
      return "... loading";
    }
    return (
      mounted && (
        <div className="view">
          <header className="view-header">
            <h1 className="view-title">Login</h1>
          </header>
          <div className="view-content">
            <input className="view-input" value={this.state.username} onChange={e => {
              this.setState({
                username: e.target.value
              })
            }} />
            <input className="view-input" value={this.state.password} onChange={e => {
              this.setState({
                password: e.target.value
              })
            }} />
            <div className="view-actions">
              <button className="view-button" onClick={this.login}>Login</button>
            </div>
          </div>
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

export default View;
