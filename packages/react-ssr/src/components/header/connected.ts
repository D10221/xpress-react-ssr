import { connect } from "react-redux";
import Header from "./header";
import { createSelector } from "reselect";
import * as sessionStore from "../../store/session";

const selector = createSelector(sessionStore.selector, session => session);

export default connect(selector)(Header);
