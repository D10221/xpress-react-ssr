import { Link } from "react-router-dom";
import styled from "styled-components";
import React from "react";

export const Head = styled.header`
justify-content: space-between;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props => {
    return props.theme.background.main;
  }};
  color: ${props => {
    return props.theme.colors.main;
  }};
`;

export const H1 = styled.h1`
  margin: 0;
  padding: 0.5rem;
  color: inherit;
`;

export const ALink = styled(
  (props: any) => <Link className={props.className} {...props} />
)`
text-decoration: none;
color: inherit;  
margin: 1rem;
`;

export const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: inherit;
`;