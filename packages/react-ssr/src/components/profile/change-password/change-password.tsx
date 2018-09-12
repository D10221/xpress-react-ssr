import { Component } from "react";
import React from "react";
import styles from "./styles";
export default class extends Component {
    render() {
        return <>
            <style children={styles} />
            <div className="container">
                <form 
                    className="form">
                    <div className="row">
                        <label htmlFor="old-password" className="label">Password:</label><input id="old-password" className="input" />
                    </div>
                    <div className="row">
                        <label htmlFor="new-password" className="label">New Password:</label><input id="new-password" className="input" />
                    </div>
                    <div className="row">
                        <button className="button" type="submit">Sumbit</button>
                    </div>
                </form>
            </div>
        </>
    }
}