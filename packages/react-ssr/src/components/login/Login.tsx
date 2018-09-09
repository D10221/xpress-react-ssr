import * as React from "react";
import styles from "./styles";

interface State {
  username: string;
  password: string;
  busy: boolean;
  error: string | undefined | null;
  success: boolean;
  referer: string | null | undefined;
}

export default class App extends React.Component<{}, State> {
  state: State = {
    username: "",
    password: "",
    busy: false,
    error: undefined,
    success: false,
    referer: undefined
  };
  componentDidMount() {
    const searchParams: URLSearchParams = new URLSearchParams(
      window.location.search
    );
    this.setState({ referer: searchParams.get("ref") });
  }
  setUsername = (username: string) => {
    this.setState({
      username
    });
  };

  setPassword = (password: string) => {
    this.setState({
      password
    });
  };

  handleTextChanged(
    f: (x: string) => any
  ): React.ChangeEventHandler<HTMLInputElement> {
    return e => {
      f(e.target.value);
    };
  }

  login = async () => {
    try {
      this.setState({ busy: true, error: undefined, success: false });

      const { username, password } = this.state;
      const r = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (!r.ok) {
        let message = "error";
        try {
          message = await r.text();
        } catch {}
        this.setState({ error: message });
        return;
      }
      await r.json();
      this.setState({ success: true });
      const a: HTMLAnchorElement = document.createElement("a");
      a.href = this.state.referer || "/";
      a.click();
    } catch (error) {
      this.setState({ error: error.message, success: false });
    } finally {
      this.setState({ busy: false });
    }
  };
  onKeyUp(key: string, f: Function): React.KeyboardEventHandler<any> {
    return e => {
      e.key === key && f();
    };
  }
  public render() {
    const { username, password } = this.state;
    return (
      <>
        <style children={styles} />
        <div className="app">
          <header className="app-header">
            <h1 className="app-title">Login</h1>
          </header>
          <div className="app-content">
            <form className="app-form">
              <div className="app-form-row">
                <label className="app-form-input-label">Username: </label>
                <input
                  autoComplete="username"
                  autoFocus={true}
                  disabled={this.state.busy || this.state.success}
                  className="app-form-input"
                  value={username}
                  onChange={this.handleTextChanged(this.setUsername)}
                />
              </div>
              <div className="app-form-row">
                <label className="app-form-input-label">Password: </label>
                <input
                  type={"password"}
                  autoComplete="current-password"
                  onKeyUp={this.onKeyUp("Enter", this.login)}
                  disabled={this.state.busy || this.state.success}
                  className="app-form-input"
                  value={password}
                  onChange={this.handleTextChanged(this.setPassword)}
                />
              </div>
            </form>
            <div className="app-form-actions">
              <button
                disabled={this.state.busy || this.state.success}
                className="app-form-action-button"
                onClick={this.login}
              >
                Login
              </button>
            </div>
            {this.state.success && (
              <div>
                <span>SUCCESS</span>
              </div>
            )}
            {this.state.busy && (
              <div className="busy">
                <span className="busy-text">...please wait</span>
              </div>
            )}
            {this.state.error && (
              <div className="error">
                <span className="error-text">{this.state.error}</span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
