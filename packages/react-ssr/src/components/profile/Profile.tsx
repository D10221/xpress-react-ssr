import React, { Component } from "react";
export default class Profile extends Component<{ user: {} | null | undefined }> {
    render() {
        const { user } = this.props;
        return <pre>{JSON.stringify(user, null, 2)}</pre>
    }
}