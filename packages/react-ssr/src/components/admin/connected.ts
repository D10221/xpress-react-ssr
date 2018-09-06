import { connect } from "react-redux";
import Admin from "./Admin";
import { createSelector } from "reselect";
import * as sessionStore from "../../store/session";

const selector = createSelector(sessionStore.selector, session => session);

export default connect(selector)(Admin);
