import React, { StatelessComponent } from "react";
import Html from "../html";
import Header from "../header";

const View: StatelessComponent<{ user?: any, path?: any, params?: any, query?: any }> = (props) => {
    const { user, path, params, query } = props;
    return <Html title="xpresso" >
        <Header title={<span style={{ textTransform: "uppercase" }}>xpresso</span>}></Header>
        <div id="root" data-req={JSON.stringify({ path, params, query, user })}>
            <form style={{}} method="POST" >
                <input value={"username"} style={{}}/>
                <input value={"password"} style={{}}/>
            </form>>
        </div>
    </Html>
}
export default View;