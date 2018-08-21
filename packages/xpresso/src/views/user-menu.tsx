import React, { StatelessComponent } from "react";
/** */
const UserMenu: StatelessComponent<{ user: {}|undefined|null }> = function(props) {
  const { user } = props;
  return <div>{!user && <a href="/login">LOGIN</a>}</div>;
};

export default UserMenu;
