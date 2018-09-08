import React from "react";
import { Connected as Circuits } from "../circuits";

export interface HomeProps {
  
}

export default class Home extends React.Component<HomeProps> {
  
  static requirements = [
    // children requirements
    (Circuits as any).requirements
  ];

  render() {    
    return (
      <div>
        <Circuits />
      </div>
    );
  }
}
