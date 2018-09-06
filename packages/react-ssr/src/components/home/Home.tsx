import React from "react";

export default class Home extends React.Component<{
  circuits: { circuitId: any; circuitName: any; Location: any }[];
  fetchData: (...args: any[]) => any;
}> {
  
  componentDidMount() {
    if (this.props.circuits.length <= 0) {
      console.log("Client Fetching...");
      this.props.fetchData();
    }
  }

  render() {
    const { circuits } = this.props;

    return (
      <div>
        <h2>F1 2018 Season Calendar</h2>
        <ul>
          {circuits.map(({ circuitId, circuitName, Location }) => (
            <li key={circuitId}>
              {circuitName} - {Location.locality}, {Location.country}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}