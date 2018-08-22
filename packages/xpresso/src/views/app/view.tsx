import React, { StatelessComponent } from "react";
import Html from "../html";
import Header from "../header";
import UserMenu from "../user-menu";

const View: StatelessComponent<{ user?: any, path?: any, params?: any, query?: any }> = (props) => {
    const { user, path, params, query } = props;
    return <Html title="xpresso" >
        <Header title={<span style={{ textTransform: "uppercase" }}>xpresso</span>}><UserMenu user={user} /></Header>
        <div id="root" data-req={JSON.stringify({ path, params, query, user })}/>
        <script src="static/app.js" />
    </Html>
}

export default View;