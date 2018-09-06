import { createSelector } from "reselect";
import { connect } from "react-redux";
import * as dataStore from "../../store/data";
import Home from "./Home";

const selector = createSelector(dataStore.selector, circuits => ({ circuits }));

const Connected = connect(
  selector,
  dataStore.bindActions
)(Home);

(Connected as any).serverFetch = dataStore.fetchData;

export default Connected;
