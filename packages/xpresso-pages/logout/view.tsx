import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import ssr from "../ssr";

interface ViewState {
    busy: boolean;
    error?: string | null;
    route?: {
        path?: string | null
    }
}

class View extends Component<{ classes: ClassNameMap }, ViewState> {
    state = {
        error: undefined,
        busy: false,
        route: {
            path: undefined
        }
    }

    componentDidMount(){
        this.setState({
            ...ssr()
        })
    }
    
    onLogout = async () => {
        const { route } = this.state;
        try {
            this.setState({ busy: true, error: undefined });
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await fetch(`${route.path}`, {
                method: "POST",
                body: JSON.stringify({}),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                const a: HTMLAnchorElement = document.createElement("a");
                a.href = "/";
                a.click();
            }

        } catch (error) {
            this.setState({ error: error && error.message ? error.message : "Error login out!" });
        } finally {
            this.setState({ busy: false });
        }
    }

    render() {
        const { error, busy } = this.state;
        const { classes } = this.props;
        return <div className={classes.root}>
            <Paper className={classes.paper}>
                {busy && <CircularProgress className={classes.progress}></CircularProgress>}
                <div className={classes.messages}>
                    {!!error && <Typography color="error" variant="headline">{error}</Typography>}
                </div>
                <div className={classes.actions}>
                    <Button onClick={this.onLogout}>Logout</Button>
                </div>
            </Paper>
        </div>
    }
}
export default withStyles(styles)(View);