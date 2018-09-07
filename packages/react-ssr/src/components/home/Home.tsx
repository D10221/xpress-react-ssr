import React from "react";
import { Circuits } from "../circuits";

export interface HomeProps {
  fetchData: (...args: any[]) => any;
  circuits: any;
}

export default class Home extends React.Component<HomeProps> {

  componentDidMount() {
    if (this.props.circuits.length <= 0) {
      console.log("Client Fetching...");
      this.props.fetchData();
    }
  }

  render() {
    const { circuits, fetchData } = this.props;
    return (
      <div>
        <Circuits {...circuits} fetchData={fetchData} />
      </div>
    );
  }
}