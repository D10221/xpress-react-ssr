import React, { StatelessComponent, ReactNode } from "react";
/** */
const Header: StatelessComponent<{ title: ReactNode }> = function(props) {
  const { title } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "1rem"
      }}
    >
      <span>{title}</span>
      <div style={{ flex: "1 0" }} />
      {props.children}
    </div>
  );
};
export default Header;
