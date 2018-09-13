import React, { StatelessComponent } from "react";
import { LogoutButton } from "../logout";
import { Head, H1, NavLinks, ALink, Nav } from "./styled";

export interface HeaderProps {
  loggedIn: boolean;
  user: { roles?: string[] } | null | undefined;
}

function hasRole(user: { roles?: string[] } | null | undefined, role: string) {
  return user && user.roles && user.roles.indexOf(role) !== -1;
}

const Header: StatelessComponent<HeaderProps> = ({ loggedIn, user }) => (
  <Head>
    <Nav>
      <H1>Title</H1>
      <NavLinks>
        <ALink to="/">
          Home
      </ALink>
        <ALink to="/about">
          About
      </ALink>
        <ALink to="/contact">
          Contact
      </ALink>
        {loggedIn &&
          hasRole(user, "admin") && (
            <ALink to="/admin">
              Admin
          </ALink>
          )}
        {loggedIn && (
          <ALink to="/profile">
            Profile
        </ALink>
        )}
        {!loggedIn && (
          <ALink to="/login">
            Login
        </ALink>
        )}
        {loggedIn && <LogoutButton />}
      </NavLinks>
    </Nav>
  </Head>
);

export default Header;
