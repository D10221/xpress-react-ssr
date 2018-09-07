import { createSelector } from "reselect";
import { connect } from "react-redux";
import { ComponentType } from "react";
import * as circuits from "../../api/circuits/store";
import Home from "./Home";

const selector = createSelector(
  circuits.selector,
  circuits => ({ circuits }));

const Connected: ComponentType<any> = connect(
  selector,
  circuits.bindActions
)(Home);

(Connected as any).serverFetch = circuits.actions.fetchData;

export default Connected;
