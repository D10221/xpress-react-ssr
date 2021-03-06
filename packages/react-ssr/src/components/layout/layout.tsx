import React, { ReactNode } from "react";
import styles from "./styles";

export interface LayoutProps {
  Header: ReactNode
}

export default class Layout extends React.Component<LayoutProps> {
  render() {
    return (
      <>
        <style children={styles} />
        <div className="layout-root">
          {this.props.Header}
          <div className="layout-content">
            {this.props.children}
          </div>
          <footer>
            <div> App footer</div>
            <nav>
              <a >LINK #1</a>
              <a >LINK #2</a>
              <a >LINK #3</a>
            </nav>
          </footer>
        </div>
      </>
    );
  }
}
