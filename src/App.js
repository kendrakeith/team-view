import React, { Component } from "react";
import axios from "axios";

import NameList from "./components/NameList/NameList.js";

class App extends Component {
  state = {
    names: []
  };

  componentDidMount() {
    axios
      .get("https://h93rvy36y7.execute-api.us-east-1.amazonaws.com/teams")
      .then(response => {
        console.log(response);

        const newNames = response.data.map(data => {
          return {
            name: data.name
          };
        });
        console.log(newNames);

        const newState = Object.assign({}, this.state, {
          names: newNames
        });

        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <NameList names={this.state.names} />
      </div>
    );
  }
}

export default App;
