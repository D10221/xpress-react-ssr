import { Component } from "react";
import React from "react";

export default class YouShouldBeLoggedIn extends Component {
    state = {
        query: ""
    }
    componentDidMount(){     
        let query = window.location.search;           
        this.setState({ query });
    }
    render() {
        const { query } = this.state;
        return <div style={{ margin: "1rem", padding: "1rem" }}>
            <h3>You Should be Logged in to see this page.</h3>
            <a href={`/login${query}`}> Login</a>
        </div>
    }
}