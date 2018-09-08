import { connect } from "react-redux";
import { ComponentType } from "react";
import Home from "./Home";

const Connected: ComponentType<any> = connect()(Home);

export default Connected;
