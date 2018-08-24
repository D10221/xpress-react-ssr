import { Card, CardActions, CardContent, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Component, KeyboardEvent, SyntheticEvent } from "react";
import styles from "./styles";
import ssr from "../ssr";
/** */
export type LoginViewProps = {
  image?: any;
};
/** private */
type ViewProps = LoginViewProps & { classes: ClassNameMap };
/** private */
type LoginViewState = {
  username: string;
  password: string;
  busy: boolean;
  error?: string | undefined;
  authenticated: boolean;
  user: {};
  route: {
    params: {},
    query: {},
    path: string
  }
}
/** */
class LoginView extends Component<ViewProps> {

  state: LoginViewState = {
    username: "",
    password: "",
    busy: false,
    error: undefined,
    authenticated: false,
    user: {},
    route: {
      params: {},
      query: {},
      path: ""
    },
  }
  /** */
  inputs: {
    password?: HTMLInputElement;
  } = {};
  /** */
  static getDerivedStateFromProps(props: ViewProps, state: LoginViewState): LoginViewState {
    const dataSet = ssr();
    const { user, route } = dataSet;
    return { ...state, user, route, authenticated: !!Object.keys(user|| {}).length };
  }
  /** */
  handleLogin = async (e?: SyntheticEvent<any>) => {
    e && e.preventDefault();

  };
  /** */
  handleLogout = (e?: SyntheticEvent<any>) => {

  };
  /** */
  onKeyUp = (key: string, callback: () => void) => (
    e: KeyboardEvent<any>,
  ) => {
    if (e.key === key) callback();
  };
  /** */
  onUsernameChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({ username: e.target.value })
  };
  /** */
  render() {
    const { classes, image, } = this.props;
    const { username, busy, error, authenticated } = this.state;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          {image && (
            <img className={classes.media} src={image} title="Logo" />
          )}
          <CardContent>
            {busy && <CircularProgress className={classes.progress} thickness={7} />}
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
            <TextField style={{ visibility: (authenticated && "hidden") || undefined }}
              inputRef={(ref: any) => (this.inputs.password = ref)}
              id="password"
              label="Password"
              type="password"
              className={classes.textField}
              margin="normal"
              onKeyUp={this.onKeyUp("Enter", this.handleLogin)}
              disabled={busy || authenticated}
            />
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

