import * as React from "react";
import {
  Actions,
  BusyBox,
  BusyText,
  Button,
  Content,
  ErrorBox,
  ErrorText,
  Form,
  Header,
  Input,
  Label,
  Root,
  Row,
  Title
} from "./styled";
/** */
interface State {
  username: string;
  password: string;
  busy: boolean;
  error: string | undefined | null;
  success: boolean;
  referer: string | null | undefined;
}
/** */
export default class Login extends React.Component<{}, State> {
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
        } catch { }
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
      <Root>
        <Header>
          <Title>Login</Title>
        </Header>
        <Content>
          <Form>
            <Row center>
              <Label>Username: </Label>
              <Input
                autoComplete="username"
                autoFocus={true}
                disabled={this.state.busy || this.state.success}
                value={username}
                onChange={this.handleTextChanged(this.setUsername)}
              />
            </Row>
            <Row >
              <Label>Password: </Label>
              <Input
                type={"password"}
                autoComplete="current-password"
                onKeyUp={this.onKeyUp("Enter", this.login)}
                disabled={this.state.busy || this.state.success}
                value={password}
                onChange={this.handleTextChanged(this.setPassword)}
              />
            </Row>
          </Form>
          <Actions>
            <Button
              disabled={this.state.busy || this.state.success}
              onClick={this.login}
            >
              Login
              </Button>
          </Actions>
          {this.state.success && (
            <div>
              <span>SUCCESS</span>
            </div>
          )}
          {this.state.busy && (
            <BusyBox>
              <BusyText>...please wait</BusyText>
            </BusyBox>
          )}
          {this.state.error && (
            <ErrorBox>
              <ErrorText>{this.state.error}</ErrorText>
            </ErrorBox>
          )}
        </Content>
      </Root>
    );
  }
}
