import { Component } from "react";
import React from "react";
import { State as CircuitsState } from "../../api/circuits/store";
import { css } from "styled-components";

const styles = css`
  .root {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .header {
    display: flex;
    flex-direction: column;
  }
  .header-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

export interface CircuitsProps extends CircuitsState {
  fetchData: (...args: any[]) => any;
}
/** */
export default class Circuits extends Component<CircuitsProps> {
  componentDidMount() {
    if (this.props.data.length <= 0) {
      console.log("Client Fetching...");
      this.props.fetchData();
    }
  }
  /** */
  reload = () => {
    this.props.fetchData();
  };
  render() {
    const { data, error, busy } = this.props;
    return (
      <><style children={styles}/>
        <div className={"root"}>
          <div className="header">
            <div className="header-row">
              <h2>F1 2018 Season Calendar</h2>
            </div>
            <div className="header-row">
              <button onClick={this.reload} disabled={busy}>
                {busy ? "Loading" : "Reload"}
              </button>
            </div>
            {error && <span style={{ color: "red" }}>{error}</span>}
          </div>
          <ul>
            {data.map(({ circuitId, circuitName, Location }) => (
              <li key={circuitId}>
                {circuitName} - {Location.locality}, {Location.country}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
