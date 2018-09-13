import React, { ReactNode } from "react";
import styled, { injectGlobal } from "styled-components";
export interface LayoutProps {
  Header: ReactNode;
  className?: any
}

injectGlobal`
 html body {
    margin: 0;
    padding: 0;
 }
 #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
  }
 `;

class Layout extends React.Component<LayoutProps> {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.Header}
        <LayoutContent>{this.props.children}</LayoutContent>
        <Footer>
          <div> App footer</div>
          <Nav>
            <A>LINK #1</A>
            <A>LINK #2</A>
            <A>LINK #3</A>
          </Nav>
        </Footer>
      </div>
    );
  }
}

export default styled(Layout)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;  
  padding: 0;
`;

const LayoutContent = styled.div`
     flex: 1 0;
    background-color: whitesmoke;
    padding: 0 1rem;
`;

const Footer = styled.footer`
    margin: 0;
    padding: 0.5rem;
    background-color: cornflowerblue;
    color: aliceblue;
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: "space-between";
    flex: 1 0;
    justify-content: flex-end;
`;

const A = styled.a`
margin: 0 0.5rem 0 0 ;
`;