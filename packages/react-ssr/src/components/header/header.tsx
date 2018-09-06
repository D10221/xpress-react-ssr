import React, { StatelessComponent } from "react";
import { Link } from "react-router-dom";
import { LogoutButton } from "../logout";

if (typeof window !== "undefined") {
  require("./header.css");
}

export interface HeaderProps { loggedIn: boolean, user: { roles?: string[] } | null | undefined };

function hasRole(user: { roles?: string[] } | null | undefined, role: string) {
  return user && user.roles && user.roles.indexOf(role) !== -1;
}

const Header: StatelessComponent<HeaderProps> = ({ loggedIn, user }) => (
  <div className="nav">
    <Link className="link" to="/">
      Home
    </Link>
    <Link className="link" to="/about">
      About
    </Link>
    <Link className="link" to="/contact">
      Contact
    </Link>
    {loggedIn && hasRole(user, "admin") && <Link className="link" to="/admin">
      Admin
    </Link>}
    {loggedIn && (
      <Link className="link" to="/profile">
        Profile
      </Link>
    )}
    {!loggedIn && (
      <Link className="link" to="/login">
        Login
      </Link>
    )}
    {loggedIn && (
      <LogoutButton />
    )}
  </div>
);

export default Header;
