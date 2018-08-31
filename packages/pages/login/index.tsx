import React from "react";
import { hydrate } from "react-dom";
import Page from "./page";
import WhenMounted from "../components/when-mounted";
if (typeof document !== "undefined") {
    hydrate(<WhenMounted><Page /></WhenMounted>, document.getElementById("root"));
}
export default Page;
((module: any) => { module && module.hot && module.hot.accept && module.hot.accept(); })(module);