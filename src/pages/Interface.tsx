import React from "react";
import InterfaceCard from '../components/interface/card';
// import Banner from "../components/ui/Banner";

import '../assets/css/interface.less';

interface InterfaceProps {
  toLogin: () => void;
}

class Interface extends React.Component<InterfaceProps> {
  constructor(props: InterfaceProps) {
    super(props);
  }
  render() {
    return (
      <div className="interface">
        <InterfaceCard enterKey={() => this.props.toLogin()} />
      </div>
    );
  }
}

export default Interface;