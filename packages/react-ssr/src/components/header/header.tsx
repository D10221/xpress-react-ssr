import React, { StatelessComponent } from "react";
import { Link } from "react-router-dom";
import { LogoutButton } from "../logout";

if (typeof window !== "undefined") {
  require("./header.css");
}

export interface HeaderProps { loggedIn: boolean };

const Header: StatelessComponent<HeaderProps> = ({ loggedIn }) => (
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
    {!loggedIn && (
      <Link className="link" to="/login">
        Login
      </Link>
    )}
    {loggedIn && (
      <Link className="link" to="/secret">
        Secret
      </Link>
    )}
    {loggedIn && (
      <LogoutButton />
    )}
  </div>
);

export default Header;
