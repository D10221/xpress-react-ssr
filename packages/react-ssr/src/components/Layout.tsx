import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../routes";
import { Connected as Header } from "./header";

export interface LayoutProps {
    
}

export default class Layout extends React.Component<LayoutProps> {
    state = {
        title: "Welcome to React SSR!",
    };

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <Header />
                <Switch>
                    {routes.map(route => <Route key={route.path} {...route} />)}
                </Switch>
            </div>
        );
    }
}
