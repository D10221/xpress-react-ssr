import View from "./view";
import { selector, bindActions } from "./store";
import { connect } from "react-redux";
const Connected = connect(
  selector,
  bindActions
)(View);
export default Connected;
