import React, { Component } from "react";

import NameList from "./components/NameList/NameList.js";

const names = [
  { name: "First Last 1" },
  { name: "First Last 2" },
  { name: "First Last 3" }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <NameList names={names} />
      </div>
    );
  }
}

export default App;
