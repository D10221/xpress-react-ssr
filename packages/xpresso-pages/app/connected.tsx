import View from "./view";
import { selector } from "./store";
import { connect } from "react-redux";
const Connected = connect(selector)(View);
export default Connected ;
