import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Component, KeyboardEvent } from "react";
import { Actions, ViewState } from "./store";
import styles from "./styles";
console.log("!");
/** */
export type LoginViewProps = {
  image?: any;
};
/** private */
type ViewProps = LoginViewProps &
  ViewState & { classes: ClassNameMap } & Actions;
/** private */
type LoginViewState = {
  username: string;
  password: string;
  referer: string;
};
/** */
class LoginView extends Component<ViewProps> {
  state: LoginViewState = {
    username: "",
    password: "",
    referer: "",
  };
  /** */
  componentDidMount() {
    const searchParams: URLSearchParams = new URLSearchParams(window.location.search);
    this.setState({ referer: searchParams.get("ref") });
  }
  /** */
  handleLogin: React.EventHandler<any> = async () => {
    try {
      const { username, password } = this.state;
      await this.props.login(username, password);
      if (!!this.props.success) {
        const a: HTMLAnchorElement = document.createElement("a");
        a.href = this.state.referer || "/";
        a.click();
      }
    } catch (error) {
      console.error(error);
    }

  }
  /** */
  handleLogout: React.EventHandler<any> = () => {
    // ...
  }
  /** */
  onKeyUp = (
    key: string,
    callback: ((e: any) => void) | React.EventHandler<any>
  ) => (e: KeyboardEvent<any>) => {
    if (e.key === key) { callback(e); }
  }
  /** */
  onUsernameChanged: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({ username: e.target.value });
  }
  onPasswordChanged: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({
      password: e.target.value
    });
  }
  /** */
  render() {
    const { classes, image, busy, error, authenticated } = this.props;
    const { username } = this.state;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          {image && <img className={classes.media} src={image} title="Logo" />}
          <CardContent>
            {busy && (
              <CircularProgress className={classes.progress} thickness={7} />
            )}
            {error && <Typography color="error">{error}</Typography>}
            <TextField
              id="username"
              label="User Name"
              className={classes.textField}
              margin="normal"
              onKeyUp={this.onKeyUp("Enter", this.handleLogin)}
              disabled={busy || !!authenticated}
              value={username}
              onChange={this.onUsernameChanged}
            />
            <TextField
              style={{ visibility: (authenticated && "hidden") || undefined }}
              id="password"
              label="Password"
              type="password"
              className={classes.textField}
              margin="normal"
              onKeyUp={this.onKeyUp("Enter", this.handleLogin)}
              value={this.state.password}
              onChange={this.onPasswordChanged}
              disabled={busy || authenticated}
            />
            <pre>{JSON.stringify({
              ...this.props,
              ...this.state,
            }, null, 2)}</pre>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              onClick={authenticated ? this.handleLogout : this.handleLogin}
              disabled={busy}
            >
              {authenticated ? "Logout" : "Login"}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(LoginView);
