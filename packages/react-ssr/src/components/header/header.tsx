import React, { StatelessComponent } from "react";
import { Link } from "react-router-dom";
import { LogoutButton } from "../logout";
import styled from "styled-components";

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

const Head = styled.header`
  justify-content: space-between;
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: cornflowerblue;
    color: aliceblue;
`;

const H1 = styled.h1`
    margin: 0;
    padding: 0.5rem;
    color: inherit;
`;

const ALink = styled((props: any) => <Link className={props.className} {...props} />)`
  text-decoration: none;
  color: inherit;  
  margin: 1rem;
`;

const NavLinks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: inherit;
`;