import React, { Component } from "react";

export interface HeaderProps { loggedIn: boolean };

class LogoutButton extends Component<{ loggedIn: boolean }> {

    state = {
        busy: false,
        error: undefined
    }

    onClick = async () => {
        try {
            this.setState({ busy: true, error: undefined });
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await fetch("/api/auth/logout", {
                method: "POST",
                body: JSON.stringify({}),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                const a: HTMLAnchorElement = document.createElement("a");
                a.href = "/";
                a.click();
            }
        } catch (error) {
            this.setState({
                error: error && error.message ? error.message : "Error login out!"
            });
        } finally {
            this.setState({ busy: false });
        }
    }

    render() {
        const { loggedIn } = this.props;
        const { busy, error } = this.state;
        return loggedIn && (
            <button className="link" onClick={this.onClick} >
                {!busy && !error && <span>Logout</span>}
                {busy && <span>...wait</span>}
                {error && <span style={{ color: "red", marginLeft: "1rem" }}>{error} retry?</span>}
            </button>
        )

    }
}

export default LogoutButton;
