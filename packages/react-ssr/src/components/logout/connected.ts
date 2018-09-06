import { connect } from "react-redux";
import LoginButton from "./LogoutButton";
import { createSelector } from "reselect";
import * as sessionStore from "../../store/session";

const selector = createSelector(sessionStore.selector, session => session);

export default connect(selector)(LoginButton);
