import { bindActions, selector } from "@local/tiny-auth-redux";
import { connect } from "react-redux";
import Page from "./login";
import { ComponentType } from "react";
import { Dispatch } from "redux";
const Connected: ComponentType<any> = connect(state => {
    return selector(state);
}, (dispatch: Dispatch) => {
    return bindActions(dispatch);
})(Page);
export default Connected;;