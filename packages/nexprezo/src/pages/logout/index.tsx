import React from "react";
import { hydrate } from "react-dom";
import Page from "./page";
if (typeof document !== "undefined") {
    hydrate(React.createElement(Page), document.getElementById("root"));
}
export default Page;
((module: any) => { module && module.hot && module.hot.accept && module.hot.accept(); })(module);