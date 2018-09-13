import { ComponentType } from "react";
import React from "react";
/**
 * TODO
 * @param props 
 */
const withStyles: ComponentType<{ styles: any }> = props => {
  return (
    <>
      <style children={props.styles} />
      {props.children}
    </>
  );
};
export default withStyles;
