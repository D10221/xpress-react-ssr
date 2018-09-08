import React from "react";
import { Connected as Circuits } from "../circuits";

export interface HomeProps {
  
}

export default class Home extends React.Component<HomeProps> {
  
  static serverFetch = [
    // children requirements
    (Circuits as any).serverFetch
  ];

  render() {    
    return (
      <div>
        <Circuits />
      </div>
    );
  }
}
