import { createSelector } from "reselect";
import { connect } from "react-redux";
import { ComponentType } from "react";
import * as circuits from "../../api/circuits/store";
import View from "./Circuits";

const selector = createSelector(
  circuits.selector,
  circuits => circuits);

const Connected: ComponentType<any> = connect(
  selector,
  circuits.bindActions
)(View);

(Connected as any).requirements = [circuits.actions.fetchData];

export default Connected;
