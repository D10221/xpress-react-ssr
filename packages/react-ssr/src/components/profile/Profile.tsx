import React, { Component } from "react";
import { ChangePassword } from "./change-password";
import ChangeEmail from "./change-email";
import DeletyeAccount from "./delete-account";
import { Tabs } from "../tabs";
/** */
export default class Profile extends Component<{
  user: {} | null | undefined;
}> {

  render() {
    const { user } = this.props;
    return (<>
      <Tabs labels={["Info", "Change Password", "ChangeEmail", "Delete Account"]}>
        <>
          <h2>Profile</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
        <ChangePassword />
        <ChangeEmail />
        <DeletyeAccount />
      </Tabs>
    </>);
  }
}
